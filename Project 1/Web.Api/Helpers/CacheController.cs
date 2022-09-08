using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Helpers
{
    public class CacheController
    {
        private IMemoryCache _cache;

        public CacheController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public void UpsertContact(ContactModel contact)
        {
            var key = $"{CacheKeys.Contact}_{contact.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, contact, cacheEntryOptions);
        }

        public void deleteContact(ContactModel contact)
        {
            var key = $"{CacheKeys.Contact}_{contact.Id}";

            _cache.Remove(key);
        }

        public void UpsertDrug(Drug drug)
        {
            var key = $"{CacheKeys.Drug}_{drug.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, drug, cacheEntryOptions);
        }

        public void deleteDrug(Drug drug)
        {
            var key = $"{CacheKeys.Drug}_{drug.Id}";

            _cache.Remove(key);
        }

        public void UpsertLookup(LookUp lookup)
        {
            var key = $"{CacheKeys.Lookup}_{lookup.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, lookup, cacheEntryOptions);
        }

        public void deleteLookup(LookUp lookup)
        {
            var key = $"{CacheKeys.Lookup}_{lookup.Id}";

            _cache.Remove(key);
        }

        public void UpsertLocation(Location location)
        {
            var key = $"{CacheKeys.Location}_{location.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, location, cacheEntryOptions);
        }

        public void deleteLocation(Location location)
        {
            var key = $"{CacheKeys.Lookup}_{location.Id}";

            _cache.Remove(key);
        }

        public void UpsertGrantor(Grantor grantor)
        {
            var key = $"{CacheKeys.Grantor}_{grantor.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, grantor, cacheEntryOptions);
        }

        public void deleteGrantor(Grantor grantor)
        {
            var key = $"{CacheKeys.Grantor}_{grantor.Id}";

            _cache.Remove(key);
        }
        public void UpsertTag(Tag tag)
        {
            var key = $"{CacheKeys.Tag}_{tag.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, tag, cacheEntryOptions);
        }

        public void deleteTag(Tag tag)
        {
            var key = $"{CacheKeys.Tag}_{tag.Id}";

            _cache.Remove(key);
        }

        public void UpsertMediaFile(MediaFile mediaFile)
        {
            var key = $"{CacheKeys.MediaFile}_{mediaFile.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, mediaFile, cacheEntryOptions);
        }

        public void deleteMediaFile(MediaFile mediaFile)
        {
            var key = $"{CacheKeys.MediaFile}_{mediaFile.Id}";

            _cache.Remove(key);
        }

        public void UpsertRota(Rota rota)
        {
            var key = $"{CacheKeys.Rota}_{rota.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, rota, cacheEntryOptions);
        }

        public void deleteRota(Rota rota)
        {
            var key = $"{CacheKeys.Rota}_{rota.Id}";

            _cache.Remove(key);
        }

        public void UpsertTodo(Todo todo)
        {
            var key = $"{CacheKeys.Todo}_{todo.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, todo, cacheEntryOptions);
        }

        public void deleteTodo(Todo todo)
        {
            var key = $"{CacheKeys.Todo}_{todo.Id}";

            _cache.Remove(key);
        }
        public void UpsertTicket(Ticket ticket)
        {
            var key = $"{CacheKeys.Ticket}_{ticket.Id}";
            // Keep in cache for this time, reset time if accessed.
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

            _cache.Set(key, ticket, cacheEntryOptions);
        }
    }
}
