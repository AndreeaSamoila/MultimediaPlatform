﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ChatTest.App.Models;
using ChatTest.App.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatTest.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMessangesService _messangesService;
        private readonly IConversationService _conversationService;



        public MessagesController(IUserService userService, IMessangesService messangesService, IConversationService conversationService)
        {
            _userService = userService;
            _messangesService = messangesService;
            _conversationService = conversationService;
        }



        [HttpGet("{conversationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<MessageGetModel>> Get([FromHeader(Name = "Authorisation")] string userToken,
                                                           [FromRoute] int conversationId)
        {
            if (string.IsNullOrEmpty(userToken))
                return Unauthorized();

            UserModel user = _userService.GetUser(userToken);

            if (user == null || !_userService.IsValid(user))
                return Forbid();

            ConversationModel conv = _conversationService.Get(conversationId, user.Name);

            if (conv == null)
                return NotFound();

            if (!conv.Participants.Contains(user.Name))
                return Unauthorized("You're not part of the conversation");

            return Ok(_messangesService.GetMessages(conversationId, user.Name));
        }



        [HttpPost("{conversationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Create([FromHeader(Name = "Authorisation")] string userToken,
                                                [FromRoute] int conversationId,
                                                [FromBody, Required] MessageCreateModel model)
        {
            if (string.IsNullOrEmpty(userToken))
                return Unauthorized();

            if (model == null)
                return BadRequest("Missing create model");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            UserModel user = _userService.GetUser(userToken);

            if (user == null || !_userService.IsValid(user))
                return Forbid();

            ConversationModel conv = _conversationService.Get(conversationId, user.Name);

            if (conv == null)
                return NotFound();

            if (!conv.Participants.Contains(user.Name))
                           return Unauthorized("You're not part of the conversation");

            await _messangesService.Create(user.Name, conversationId, model.Text, HttpContext.RequestAborted)
                                   .ConfigureAwait(false);

            return NoContent();
        }
    }
}
