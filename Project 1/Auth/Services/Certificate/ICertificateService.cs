using System.Security.Cryptography.X509Certificates;

namespace Auth.Services.Certificate
{
    public interface ICertificateService
    {
        X509Certificate2 GetCertificateFromKeyVault(string vaultCertificateName);
    }
}