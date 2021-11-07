resource "vercel_project" "perfolio" {
  team_id = "team_ZYPNERZjT0L9LkPdP0Y9ZtS2"
  name    = "perfolio_tf"
  git_repository {
    type = "github"
    repo = "perfolio/perfolio"
  }

  framework                  = "nextjs"
  build_command              = "pnpm deploy"
  install_command            = "npm i -g pnpm && pnpm install"
  serverless_function_region = "fra1"

}