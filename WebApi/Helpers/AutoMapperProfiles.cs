using System.Linq;
using AutoMapper;
using Pro_Domain.Entities;
using Pro_Domain.Identity;
using WebApi.Dtos;

namespace WebApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDto>().ForMember(
                dest => dest.Palestrantes, opt => {
                    opt.MapFrom(src => src.EventoPalestrantes.Select(x => x.Palestrante).ToList());
                }
            ).ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ForMember(
                dest => dest.Evento, opt => {
                    opt.MapFrom(src => src.EventoPalestrantes.Select(x => x.Evento).ToList());
                }
            ).ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}