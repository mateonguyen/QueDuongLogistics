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

        CreateMap<Customer, CustomerDto>();

        CreateMap<CustomerDto, Customer>();
        
        CreateMap<CustomerForUpdateDto, Customer>();

        CreateMap<Driver, DriverDto>();

        CreateMap<DriverDto, Driver>();

        CreateMap<Vehicle, VehicleDto>();

        CreateMap<VehicleDto, Vehicle>();

        CreateMap<Vendor, VendorDto>();

        CreateMap<VendorDto, Vendor>();

        CreateMap<Location, LocationDto>();

        CreateMap<LocationDto, Location>();

        CreateMap<ShippingRoute, ShippingRouteDto>();

        CreateMap<ShippingRouteDto, ShippingRoute>();
        
        CreateMap<ShippingRouteForCreationDto, ShippingRoute>();
        
        CreateMap<TransactionDetail, TransactionDetailDto>();

        CreateMap<Transaction, TransactionDto>()
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.CustomerName))
            // .ForMember(dest => dest.VehicleName, opt => opt.MapFrom(src => src.Vehicle.VehicleNumber))
            // .ForMember(dest => dest.DriverName, opt => opt.MapFrom(src => src.Driver.FullName))
            .ForMember(dest => dest.VendorName, opt => opt.MapFrom(src => src.Vendor.VendorName));


        CreateMap<TransactionDto, Transaction>();

        CreateMap<TransactionForCreationDto, Transaction>();

        CreateMap<TransactionDetailDto, TransactionDetail>();
    }
}
