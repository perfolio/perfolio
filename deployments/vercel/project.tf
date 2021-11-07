resource "vercel_project" "perfolio" {
  team_id = var.team_id
  name    = "perfolio_tf"
  git_repository {
    type = "github"
    repo = "perfolio/perfolio"
  }

  framework                  = "nextjs"
  build_command              = "pnpm deploy"
  install_command            = "npm i -g pnpm && pnpm install"

}