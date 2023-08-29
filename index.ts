import { WebContainer } from '@webcontainer/api'

function reportOutput(output: string) {
  console.log(output)
}

window.addEventListener("load", async (
) => {
  reportOutput("Booting...")
  const wc = await WebContainer.boot()
  reportOutput("Booting complete!")
})
