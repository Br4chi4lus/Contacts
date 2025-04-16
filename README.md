# Uruchomienie
```
git clone https://github.com/Br4chi4lus/Contacts.git
docker compose up
```
Należy w osobnym terminalu przejść do projektu ASP .NET Core:
```
cd Contacts.API
dotnet ef database update
```
Po aktualizacji bazy
```
dotnet run --launch-profile http
```
W kolejnym terminalu należy przejść do projektu Angular:
```
cd Contacts.Frontend
npm install
ng serve 
```
Frontend dostępny pod adresem: http://localhost:4200/
# Wykorzystane biblioteki
* Entity Framework
* Automapper
* FluentValidation
* JwtBearer
* Npgsql - postgres
* bootstrap
* jwt-decode
# Struktura aplikacji
## UserController
Kontroler API obsługujący operacje na użytkownikach:  
GetAllUsers() - zwraca wszystkich użytkowników  
GetUserById(int id) - zwraca użytkownika z podanym id  
RegisterUser(RegisterUserDto registerUserDto) - tworzy użytkownika  
LoginUser(LoginUserDto loginUserDto) - zwraca token JWT  
## ContactController
Kontroler API obsługujący operacje na kontaktach:  
GetAllContacts(int userId) - zwraca wszystkie kontakty użytkownika o podanym id  
GetContactById(int userId, int contactId) - zwraca kontakt należący do użytkownika o podanym id, posiadający id = contactId  
CreateContact(int userId, CreateContactDto createContactDto) - tworzy kontakt dla podanego użytkownika  
DeleteContact(int userId, int contactId) - usuwa kontakt o podanym id  
UpdateContact(int userId, int contactId, UpdateContactDto updateContactDto) - aktualizuje kontakt o podanym id   
GetAllContactCategories() - zwraca wszyskie kategorie kontaktu  
GetAllBusinessContactSubCategories() - zwraca wszystkie podkategorie kontaku biznesowego  
## UserService
Serwis wykonujący operacje na użytkownikach - metody odpowiadają metodom kontrolera
## ContactService
Serwis wykonujący operacje na kontaktach - metody odpowiadają metodom kontrolera
## UserContextService
Serwis pozwalający pobrać dane użytkownika z kontekstu HTTP.  
GetUserId - pobiera id użytkownika, na którego został wystawiony JWT  
User - claimy użytkownika, na którego został wystawiony JWT  
## Entities
Klasy używane do modelowania bazy danych. 
### ContactsDbContext
Klasa odpowiedzialna za stworzenie modelu bazy danych.
### User
Klasa reprezentująca encję użytkonika w bazie danych.
### Contact
Klasa reprezentująca encję kontaktu w bazie danych.
### ContactCategory
Klasa reprezentująca encję kategorii kontaktu - biznesowy, prywanty i inny.
### BusinessContactSubCategory
Klasa reprezentująca encję podkategorii kontaktu biznesowego - szef, klien, współpracownik.
## Exceptions
Klasy wyrzucanych wyjątków. Zaimplementowane zostały BadRequest, Forbidden, NotFound i Unathorized.
## ErrorHandlingMiddleware
Middleware odpowiedzialne za obsługę wyrzucanych wyjątków.
## Models
Klasy pozwalajace na działanie na danych i walidację.
### Validators
#### CreateContactDtoValidator
Walidator sprawdzający czy przesłany kontakt jest poprawny - kategorie, podkategorie.
#### UpdateContactDtoValidator
Walidator sprawdzający czy przesłane dane do aktualizacji kontaktu są prawidłowe.
#### RegisterUserDtoValidator
Walidator sprawdzający czy dane użytkownika są poprawne, a email nie występuje w bazie danych.
### Dto
Klasy używane do interakcji z użytkownikiem - nazwy tłumaczą do czego są używane.
## ContactsMappingProfile
Klasa do Automappera używana do mapowania dto na encje i odwrotnie.
## AuthenticationSettings
Klasa pomocnicza do JWT, przechowuje informacje do generowania tokenów.  

## ContactCreateComponent
Komponent z formularzem do tworzenia kontaktu.
## ContactDetailsComponent
Komponent do prezentacji szczegółów kontaktu.
## ContactEditComponent
Komponent z formularzem do edycji kontaktu.
## ContactsTableComponent
Komponent do prezentacji listy kontaktów.
## LoginFormComponent
Komponent z formularzem do logowania użytkownika.
## RegisterFormComponent
Komponent z formularzem do rejestracji użytkownika.
## UsersTableComponent
Komponent do prezentacji wszystkich użytkowników.
## UserDetailsComponent
Komponent do szczegółowej prezentacji użytkownika.
## LogoutComponent
Komponent do wylogowywania.
## AuthInterceptor
Interceptor do dołączania tokena JWT do zapytania.
## AuthService
Serwis do pobierania informacji z tokena JWT.
## Dtos
Podobnie jak w backendzie dto do łatwiejszego modelowania danych.
