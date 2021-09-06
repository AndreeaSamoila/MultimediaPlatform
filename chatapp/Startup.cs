using System;
using ChatTest.App.Hubs;
using ChatTest.App.Services;
using ChatTest.App.Services.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ChatTest.App
{
    public class Startup
    {
        private const string ApiCorsPolicyName = "_API_CORS_DEF";

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy(ApiCorsPolicyName,
                                                          builder => builder.WithOrigins("http://localhost:3000/", "http://localhost:3000")
//                                                                        builder => builder.SetIsOriginAllowed(origin => true) // allow any origin
                                                                            .AllowAnyHeader()
                                                                            .AllowAnyMethod()
                                                                            .AllowCredentials()));

            services.AddControllersWithViews()
                .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNameCaseInsensitive = true );
            //services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist");

            services.AddDbContext<ISiteDbContext, SiteDbContext>(options => 
                options.UseMySql(Configuration.GetConnectionString("Chat"), 
                                 new MySqlServerVersion(new Version(8, 0, 21))));

            services.AddSignalR();

            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IConversationService, ConversationService>();
            services.AddScoped<IMessangesService, MessangesService>();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseCors(ApiCorsPolicyName);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}")
                        .RequireCors(ApiCorsPolicyName);
                endpoints.MapHub<ChatHub>("/hub")
                        .RequireCors(ApiCorsPolicyName);
            });
        }
    }
}
