# MSA 2024 Phase 2 - FI.ai
- A webapp for viewing mma fighter stats and predicting fight outcomes using gemini.

## Advanced Features
- Connected to Gemini API to predict fights.
- Deployed on Azure
- Lightmode / Darkmode

# How to run locally


## Backend
- Setup Database First
1. Have SQL Server and SQL Server Managment Studio Installed
2. Install backend prerequisites with ``` dotnet restore ```
3. Run migration commands

``` 
dotnet ef migrations add (Choose whatever name you want)
dotnet ef database update
 ```

4. Set connection string and gemini api key in appsettings.json
5. Everything should be setup now do ``` dotnet run ```


## Front End
1. Install Prerequisites
``` npm install```
2. Setup env
make new .env file in, put the localhost port of the backend.
``` REACT_APP_API_URL= ```
3. Run Webapp

``` npm run start ```
