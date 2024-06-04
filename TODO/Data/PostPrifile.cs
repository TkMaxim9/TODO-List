using AutoMapper;
using TODO.DTOs.PostsDTO;
using TODO;

namespace TODO.Data
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<Post, PostDTO>();
            CreateMap<CreatePostDTO, Post>();
            CreateMap<UpdatePostDTO, Post>();
        }
    }
}