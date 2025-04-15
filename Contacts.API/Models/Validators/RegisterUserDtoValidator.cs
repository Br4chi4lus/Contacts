using Contacts.API.Entities;
using FluentValidation;

namespace Contacts.API.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(ContactsDbContext dbContext) {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .Custom((value, context) =>
                {
                    var emailNotUnique = dbContext.User.Any(u => u.Email == value);
                    if (emailNotUnique)
                    {
                        context.AddFailure("Email", "Email already taken.");
                    }
                });
            RuleFor(x => x.PhoneNumber)
                .NotEmpty()
                .Matches(@"(?:\d{3}[- ]){2}\d{3}");
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MaximumLength(24);
            RuleFor(x => x.LastName)
                .NotEmpty()
                .MaximumLength(32);
            RuleFor(x => x.DateOfBirth)
                .NotNull()
                .Custom((value, context) =>
                {
                    if (DateTime.Compare(value, DateTime.Now) >= 0)
                    {
                        context.AddFailure("DateOfBirth", "The specified date and time must be in the past.");
                    }
                });
            RuleFor(x => x.Password)
                .MinimumLength(8)
                .MaximumLength(24)
                .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
                .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
                .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
                .Matches(@"[\!\?\*\.\+\-_=]+").WithMessage("Your password must contain at least one (!? *.+-_=).");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password);
        }
    }
}
