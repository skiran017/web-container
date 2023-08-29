import { WebContainer } from '@webcontainer/api'

function reportOutput(output: string) {

  outputPanel.textContent += '\n' + (output);
}

window.addEventListener("load", async (
) => {
  reportOutput("Booting...")
  const wc = await WebContainer.boot()
  reportOutput("Booting complete!")

  const runCommand = async (cmd: string, args: []) => {
    const process = await wc.spawn(cmd, args)

    //stream output
    process.output.pipeTo(new WritableStream({
      write: (chunk) => {
        reportOutput(`Process output: ${chunk}`)
      }
    }))

    if (await process.exit) {
      reportOutput(`Process failed and exited with code ${process.exit}`)
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cmd = command.value.split(' ')[0]
    const args = command.value.split(' ').slice(1)
    await runCommand(cmd, args)
  })

  //nodejs serve in browser
  wc.on('server-ready', (port, host) => {
    reportOutput(`Server ready on ${host}:${port}`)
  })



})
