using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace api
{
    public class ICMPHealthCheck : IHealthCheck
    {
        private readonly string Host;
        private readonly int HealthyRoundTrip; // in milliseconds

        public ICMPHealthCheck(string host, int healthyRoundTrip)
        {
            Host = host;
            HealthyRoundTrip = healthyRoundTrip;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                using var ping = new Ping();
                var reply = await ping.SendPingAsync(Host);
                switch (reply.Status)
                {
                    case IPStatus.Success:
                        var msg = $"ICMP to {Host} took {reply.RoundtripTime} ms";
                        return (reply.RoundtripTime > HealthyRoundTrip)
                        ? HealthCheckResult.Degraded(msg)
                        : HealthCheckResult.Healthy(msg);
                    default:
                        var err = $"ICMP to {Host} failed with status {reply.Status}";
                        return HealthCheckResult.Unhealthy(err);
                }
            }
            catch (Exception e)
            {
                var err = $"ICMP to {Host} failed with exception {e.Message}";
                return HealthCheckResult.Unhealthy();
            }
        }
    }
}