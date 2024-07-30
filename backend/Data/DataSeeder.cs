using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Models;

public static class DataSeeder
{
    public static void SeedData(IServiceProvider serviceProvider)
    {
        using (var context = new DataContext(
            serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
        {

            var fighters = LoadFightersFromJson();
            foreach (var fighter in fighters)
            {
                // Ensure all required fields have values
                fighter.FightingStyle = string.IsNullOrEmpty(fighter.FightingStyle) ? "Unknown" : fighter.FightingStyle;
                fighter.Age = string.IsNullOrEmpty(fighter.Age) ? "Unknown" : fighter.Age;
                fighter.Category = string.IsNullOrEmpty(fighter.Category) ? "Unknown" : fighter.Category;
                fighter.Draws = string.IsNullOrEmpty(fighter.Draws) ? "Unknown" : fighter.Draws;
                fighter.Height = string.IsNullOrEmpty(fighter.Height) ? "Unknown" : fighter.Height;
                fighter.Iconurl = string.IsNullOrEmpty(fighter.Iconurl) ? "Unknown" : fighter.Iconurl;
                fighter.ImgUrl = string.IsNullOrEmpty(fighter.ImgUrl) ? "Unknown" : fighter.ImgUrl;
                fighter.LegReach = string.IsNullOrEmpty(fighter.LegReach) ? "Unknown" : fighter.LegReach;
                fighter.Losses = string.IsNullOrEmpty(fighter.Losses) ? "Unknown" : fighter.Losses;
                fighter.Nickname = string.IsNullOrEmpty(fighter.Nickname) ? "Unknown" : fighter.Nickname;
                fighter.OctagonDebut = string.IsNullOrEmpty(fighter.OctagonDebut) ? "Unknown" : fighter.OctagonDebut;
                fighter.PlaceOfBirth = string.IsNullOrEmpty(fighter.PlaceOfBirth) ? "Unknown" : fighter.PlaceOfBirth;
                fighter.Reach = string.IsNullOrEmpty(fighter.Reach) ? "Unknown" : fighter.Reach;
                fighter.Status = string.IsNullOrEmpty(fighter.Status) ? "Unknown" : fighter.Status;
                fighter.TrainsAt = string.IsNullOrEmpty(fighter.TrainsAt) ? "Unknown" : fighter.TrainsAt;
                fighter.Weight = string.IsNullOrEmpty(fighter.Weight) ? "Unknown" : fighter.Weight;
                fighter.Wins = string.IsNullOrEmpty(fighter.Wins) ? "Unknown" : fighter.Wins;

                context.Fighters.Add(fighter);

            }

            var rankings = LoadRankingsFromJson();
            foreach (var ranking in rankings)
            {   
            context.Ranks.Add(ranking);
            }

            context.SaveChanges();
        }
    }

    private static List<Fighter> LoadFightersFromJson()
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", "fighterdata_updated.json");
        var json = File.ReadAllText(path);
        return JsonConvert.DeserializeObject<List<Fighter>>(json);
    }

    private static List<Listranking> LoadRankingsFromJson()
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", "rankings.json");
        var json = File.ReadAllText(path);
        return JsonConvert.DeserializeObject<List<Listranking>>(json);
    }}
