using Contacts.API.Entities;
using FluentValidation;

namespace Contacts.API.Models.Validators
{
    public class UpdateContactDtoValidator : AbstractValidator<UpdateContactDto>
    {
        public UpdateContactDtoValidator() 
        {
            When(c => c.Name is not null, () =>
            {
                RuleFor(c => c.Name).NotEmpty();
            });
            When(c => c.CategoryId is not null, () =>
            {
                When(c => c.CategoryId == (int)ContactCategoryEnum.Private, () =>
                {
                    RuleFor(c => c.SubCategoryId)
                    .Null();
                    RuleFor(c => c.SubCategoryName)
                    .Empty();
                });
                When(c => c.CategoryId == (int)ContactCategoryEnum.Business, () =>
                {
                    RuleFor(c => c.SubCategoryId)
                    .NotNull();
                    RuleFor(c => c.SubCategoryName)
                    .Empty();
                });
                When(c => c.CategoryId == (int)ContactCategoryEnum.Other, () =>
                {
                    RuleFor(c => c.SubCategoryId)
                    .Null();
                    RuleFor(c => c.SubCategoryName)
                    .NotEmpty();
                });
            });
        }
    }
}
