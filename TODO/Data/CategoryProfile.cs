using AutoMapper;
using TODO.DTOs.CategoriesDTO;
using TODO;

namespace TODO.Data
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryWithoutPostsDTO>();
            CreateMap<CreateCategoryDTO, Category>();
            CreateMap<UpdateCategoryDTO, Category>();
        }
    }
}

