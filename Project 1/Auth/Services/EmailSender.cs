using System.Threading.Tasks;
using Auth.Models;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Auth.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IOptions<EmailSettings> _optionsEmailSettings;

        public EmailSender(IOptions<EmailSettings> optionsEmailSettings)
        {
            _optionsEmailSettings = optionsEmailSettings;
        }

        public async Task SendEmailAsync(string email, string subject, string message, string toUsername = null)
        {
            var client = new SendGridClient(_optionsEmailSettings.Value.SendGridApiKey);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "Medcilia Assistant"));
            msg.AddTo(new EmailAddress(email, toUsername));
            msg.SetSubject(subject);
            msg.AddContent(MimeType.Text, message);
            msg.AddContent(MimeType.Html, message);

            msg.SetReplyTo(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "Medcilia Assistant"));

            var response = await client.SendEmailAsync(msg);
        }
    }
}
