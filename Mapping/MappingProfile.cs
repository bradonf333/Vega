using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Photo, PhotosResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(
                    v => new ContactResource
                    {
                        Name = v.ContactName,
                        Email = v.ContactEmail,
                        Phone = v.ContactPhone
                    }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(
                    vf => vf.FeatureId
                )));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(
                    v => new ContactResource
                    {
                        Name = v.ContactName,
                        Email = v.ContactEmail,
                        Phone = v.ContactPhone
                    }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(
                    vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name }
                )))
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));


            // API Resource to Domain
            CreateMap<VehicleQueryResource, VehicleQuery>();
            // Used when creating new vehicle
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {

                    // Remove unselected features
                    var removedFeatures = v.Features.Where(features => !vr.Features.Contains(features.FeatureId));

                    foreach (var features in removedFeatures)
                    {
                        v.Features.Remove(features);
                    }

                    // Add selected features
                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id))
                        .Select(id => new VehicleFeature { FeatureId = id });

                    foreach (var features in addedFeatures)
                    {
                        v.Features.Add(features);
                    }
                });
        }
    }
}