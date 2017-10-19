using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(
                    v => new ContactResource {
                        Name = v.ContactName,
                        Email = v.ContactEmail,
                        Phone = v.ContactPhone
                }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(
                    vf => vf.FeatureId
                )));

            // API Resource to Domain - used when creating new vehicle
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    
                    // Remove unselected features
                    var removedFeatures = v.Features.Select(features => !vr.Features.Contains(features.FeatureId));

                    foreach (var features in removedFeatures)
                    {
                        v.Features.Remove(features);
                    }

                    // Add selected features
                    foreach (var id in vr.Features)
                    {
                        if (!v.Features.Any(f => f.FeatureId == id))
                        {
                            v.Features.Add(new VehicleFeature {FeatureId = id});
                        }
                    }
                });
        }
    }
}