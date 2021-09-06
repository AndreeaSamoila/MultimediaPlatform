﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ChatTest.App.Models;
using ChatTest.App.Services;
using ChatTest.App.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatTest.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConversationService _conversationService;
        private readonly IMessangesService _messangesService;



        public ConversationController(IUserService userService, IConversationService conversationService, IMessangesService messangesService)
        {
            _userService = userService;
            _conversationService = conversationService;
            _messangesService = messangesService;
        }



        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public ActionResult<IEnumerable<ConversationGetModel>> Get([FromHeader(Name = "Authorisation")] string userToken)
        {
            if (string.IsNullOrEmpty(userToken))
                return Unauthorized();

            UserModel user = _userService.GetUser(userToken);

            if (user == null || !_userService.IsValid(user))
                return Forbid();

            List<ConversationGetModel> conversations = _conversationService.GetUserConversations(user.Name).ToList();

            foreach (ConversationGetModel conversation in conversations.Where(c => string.IsNullOrEmpty(c.Text)))
                conversation.Text = _messangesService.GetMessages(conversation.Id, user.Name)
                                                     .LastOrDefault()?
                                                     .Text;

            return Ok(conversations);
        }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<ConversationModel>> Create([FromHeader(Name = "Authorisation")] string userToken,
                                                             [FromBody, Required] ConversationCreateModel model)
        {
            if (string.IsNullOrEmpty(userToken))
                return Unauthorized();

            if (model == null)
                return BadRequest("Missing create model");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IList<string> participants = model.Participants as IList<string> ?? model.Participants.ToList();

            if (participants.Count <= 1)
                return BadRequest("Select at least a participant besides you");

            UserModel user = _userService.GetUser(userToken);

            if (user == null || !_userService.IsValid(user))
                return Forbid();

            if (!participants.Contains(user.Name))
                return BadRequest("You need to be part of the conversation");

            if (_conversationService.Exists(model.Participants, model.Name))
                return Conflict("Conversation already exists");

            if (string.IsNullOrEmpty(model.Name))
                model.Name = string.Join(", ", participants.Where(p => p != user.Name)).Limit(50);

            ConversationModel conversation = await _conversationService.Create(model.Name, participants, user.Name, HttpContext.RequestAborted);

            return CreatedAtAction(nameof(MessagesController.Get),
                                   nameof(MessagesController),
                                   new {conversation = conversation.Id},
                                   conversation);
        }



        [HttpDelete("{conversationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete([FromHeader(Name = "Authorisation")] string userToken,
                                    [FromRoute] int conversationId)
        {
            UserModel user = _userService.GetUserByToken(userToken);

            if (user == null || !_userService.IsValid(user))
                return Unauthorized();

            var conv = _conversationService.Get(conversationId, user.Name);

            if (conv == null)
                return NotFound();

            if (!conv.Participants.Contains(user.Name))
                return Unauthorized();

            await _conversationService.Delete(conversationId);

            return NoContent();
        }
    }
}
