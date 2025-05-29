# motors

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```









# Cégjegyzék REST API létrehozása Visual Studio 2022-ben - Részletes útmutató

## 1. Projekt létrehozása

1. Indítsd el a Visual Studio 2022-t
2. Kattints a "Create a new project" (Új projekt létrehozása) gombra
3. A keresőmezőbe írd be: "ASP.NET Core Web API"
4. Válaszd ki az "ASP.NET Core Web API" sablont, majd kattints a "Next" (Tovább) gombra
5. A projekt beállításainál:
   - Project name (Projekt név): `Cegjegyzek`
   - Location (Hely): Válaszd ki a kívánt mappát
   - Solution name (Megoldás név): `Cegjegyzek`
6. Kattints a "Next" (Tovább) gombra
7. A következő képernyőn:
   - .NET verzió: .NET 8.0
   - Authentication type (Hitelesítés típusa): None
   - Configure for HTTPS: Pipáld be
   - Enable Docker: Ne pipáld be
   - Use controllers: Pipáld be (fontos!)
   - Enable OpenAPI support: Pipáld be
8. Kattints a "Create" (Létrehozás) gombra

## 2. NuGet csomagok telepítése

1. Kattints jobb gombbal a Solution Explorerben a projektre
2. Válaszd a "Manage NuGet Packages" (NuGet csomagok kezelése) opciót
3. A "Browse" (Böngészés) fülön keress rá és telepítsd a következő csomagokat:
   - `Microsoft.EntityFrameworkCore` (8.0.13 verzió)
   - `Microsoft.EntityFrameworkCore.Design` (8.0.13 verzió)
   - `Microsoft.EntityFrameworkCore.Tools` (8.0.13 verzió)
   - `Pomelo.EntityFrameworkCore.MySql` (8.0.0 verzió)
   - `Microsoft.VisualStudio.Web.CodeGeneration.Design` (8.0.7 verzió)

## 3. Projekt struktúra létrehozása

1. Hozz létre mappákat a Solution Explorerben (jobb klikk a projekten > Add > New Folder):
   - `Entities`
   - `Context`

## 4. Entity osztály létrehozása

1. Jobb klikk az `Entities` mappán > Add > Class
2. Nevezd el: `Ceg.cs`
3. Írd be a következő kódot:

```csharp
namespace Cegjegyzek.Entities
{
    public class Ceg
    {
        public int Id { get; set; }

        public string Cegnev { get; set; }

        public DateTime Alapitasido { get; set; }

        public string Telephely { get; set; }

        public string Elerhetoseg { get; set; }

        public string Adoszam { get; set; }
    }
}
```

## 5. DbContext osztály létrehozása

1. Jobb klikk a `Context` mappán > Add > Class
2. Nevezd el: `CegContext.cs`
3. Írd be a következő kódot:

```csharp
using Cegjegyzek.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cegjegyzek.Context
{
    public class CegContext : DbContext
    {
        public DbSet<Ceg> Cegek { get; set; }
        
        public CegContext(DbContextOptions<CegContext> options) : base(options) { }
    }
}
```

## 6. Program.cs konfigurálása

1. Nyisd meg a `Program.cs` fájlt
2. Cseréld le a teljes tartalmát a következőre:

```csharp
using Cegjegyzek.Context;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CegContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 0))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 7. Controller létrehozása

1. Jobb klikk a `Controllers` mappán > Add > Controller
2. Válaszd az "API Controller with actions, using Entity Framework" opciót
3. Kattints az "Add" gombra
4. A következő beállításokat add meg:
   - Model class: `Ceg (Cegjegyzek.Entities)`
   - Data context class: `CegContext (Cegjegyzek.Context)`
   - Controller name: `CegController`
5. Kattints az "Add" gombra
6. A generált controller kódját ellenőrizd és szükség esetén módosítsd, hogy a következőképpen nézzen ki:

```csharp
using Cegjegyzek.Context;
using Cegjegyzek.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cegjegyzek.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CegController : ControllerBase
    {
        private readonly CegContext _context;

        public CegController(CegContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ceg>>> GetCegs()
        {
            return await _context.Cegek.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ceg>> GetCeg(int id)
        {
            var ceg = await _context.Cegek.FindAsync(id);

            if (ceg == null)
            {
                return NotFound();
            }

            return ceg;
        }

        [HttpPost]
        public async Task<ActionResult<Ceg>> PostCeg(Ceg ceg)
        {
            _context.Cegek.Add(ceg);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCeg), new { id = ceg.Id }, ceg);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCeg(int id, Ceg ceg)
        {
            if (id != ceg.Id)
            {
                return BadRequest();
            }

            _context.Entry(ceg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CegExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCeg(int id)
        {
            var ceg = await _context.Cegek.FindAsync(id);
            if (ceg == null)
            {
                return NotFound();
            }

            _context.Cegek.Remove(ceg);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CegExists(int id)
        {
            return _context.Cegek.Any(e => e.Id == id);
        }
    }
}
```

## 8. appsettings.json konfigurálása

1. Nyisd meg az `appsettings.json` fájlt
2. Módosítsd a tartalmát a következőre:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=cegjegyzekdb;User=root;Password=;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**Megjegyzés:** A fenti kapcsolati karakterláncban a MySQL szerver beállításai alapértelmezettek. Módosítsd a `User` és `Password` értékeket a saját MySQL szerver beállításaidnak megfelelően.

## 9. Migráció létrehozása és adatbázis frissítése

1. Nyisd meg a Package Manager Console-t (Tools > NuGet Package Manager > Package Manager Console)
2. Írd be a következő parancsot a migráció létrehozásához:

```
Add-Migration InitialCreate
```

3. Majd írd be a következő parancsot az adatbázis frissítéséhez:

```
Update-Database
```

Alternatívaként használhatod a .NET CLI-t is a Visual Studio terminálban:

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 10. Az alkalmazás futtatása

1. Nyomd meg az F5 billentyűt vagy kattints a "Start" gombra a Visual Studio felső eszköztárában
2. A böngészőben megnyílik a Swagger UI, ahol tesztelheted az API végpontokat
3. A következő végpontok állnak rendelkezésre:
   - GET /api/Ceg - Összes cég lekérdezése
   - GET /api/Ceg/{id} - Egy cég lekérdezése azonosító alapján
   - POST /api/Ceg - Új cég létrehozása
   - PUT /api/Ceg/{id} - Cég adatainak frissítése
   - DELETE /api/Ceg/{id} - Cég törlése

## Hibaelhárítás

Ha problémákba ütközöl a projekt létrehozása során, ellenőrizd a következőket:

1. **Névterek egyezése**: Győződj meg róla, hogy minden fájlban a megfelelő névtereket használod (`Cegjegyzek.Entities`, `Cegjegyzek.Context`, `Cegjegyzek.Controllers`).

2. **MySQL szerver**: Ellenőrizd, hogy a MySQL szerver fut-e, és hogy a kapcsolati karakterlánc helyes-e az `appsettings.json` fájlban.

3. **NuGet csomagok verziói**: Győződj meg róla, hogy a megfelelő verziójú NuGet csomagokat telepítetted.

4. **Entity Framework Tools**: Ha problémák adódnak a migrációs parancsokkal, próbáld meg újratelepíteni a `Microsoft.EntityFrameworkCore.Tools` csomagot.

5. **Pomelo MySQL Provider**: Ha problémák adódnak a MySQL kapcsolattal, ellenőrizd, hogy a `Pomelo.EntityFrameworkCore.MySql` csomag megfelelően van-e telepítve.