using Microsoft.EntityFrameworkCore.Migrations;

namespace ndso_bowling.Migrations
{
    public partial class Initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Coach_CoachId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Coach_CoachId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coach",
                table: "Coach");

            migrationBuilder.RenameTable(
                name: "Coach",
                newName: "Coaches");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coaches",
                table: "Coaches",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Coaches_CoachId",
                table: "Athletes",
                column: "CoachId",
                principalTable: "Coaches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Coaches_CoachId",
                table: "Games",
                column: "CoachId",
                principalTable: "Coaches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Coaches_CoachId",
                table: "Users",
                column: "CoachId",
                principalTable: "Coaches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Athletes_Coaches_CoachId",
                table: "Athletes");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Coaches_CoachId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Coaches_CoachId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coaches",
                table: "Coaches");

            migrationBuilder.RenameTable(
                name: "Coaches",
                newName: "Coach");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coach",
                table: "Coach",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Athletes_Coach_CoachId",
                table: "Athletes",
                column: "CoachId",
                principalTable: "Coach",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Coach_CoachId",
                table: "Games",
                column: "CoachId",
                principalTable: "Coach",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Coach_CoachId",
                table: "Users",
                column: "CoachId",
                principalTable: "Coach",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
