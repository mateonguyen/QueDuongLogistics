namespace Backend.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, UserDto>()
            .ForMember(dest => dest.GroupName, opt => opt.MapFrom(src => src.Group.GroupName));
        // .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => Convert.ToBase64String(src.Photo)));

        CreateMap<UserCreateDto, AppUser>();

        CreateMap<RoleCreateDto, AppRole>();

        CreateMap<AppGroup, GroupListDto>();

        CreateMap<GroupCreateDto, AppGroup>();

        CreateMap<GroupUpdateDto, AppGroup>();

        CreateMap<RoleUpdateDto, AppRole>();

        CreateMap<ProfileDto, AppUser>();

        CreateMap<CodeCreateDto, AdmCode>();

        CreateMap<CodeUpdateDto, AdmCode>();

        CreateMap<AdmCode, CodeDto>();

        CreateMap<CodeValueCreateDto, AdmCodeValue>();

        CreateMap<CodeValueUpdateDto, AdmCodeValue>();

        CreateMap<AdmCodeValue, CodeValueDto>();

        CreateMap<AuditLog, AuditForHomeDto>();
    }
}
