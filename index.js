const core = require("@actions/core")
const github = require("@actions/github")
const fs = require("fs")
const algoliasearch = require("algoliasearch")

const client = algoliasearch("XRHUM5F9FB", "dd097449f0287ce3f5eaaedb3c5d6882")
const index = client.initIndex("feu")
const section = "feu/js-frameworks/"

try {
	const newFiles = core.getInput("new-files")
	const updatedFiles = core.getInput("updated-files")
	const deletedFiles = core.getInput("deleted-files")
	// const payload = JSON.stringify(github.context.payload);
	console.log(`newFiles: ${newFiles.toString()}`)
	console.log(`updatedFiles: ${updatedFiles.toString()}`)
	console.log(`deletedFiles: ${deletedFiles.toString()}`)

	// const newFileArray = newFiles.split(",")
	// newFileArray.forEach(file => {
	// 	console.log(file)
	// 	const contents = fs.readFileSync(file, "utf8")
	// 	console.log(contents)
	// })

	const data = []

    const newFileArray = JSON.parse(newFiles)
	const updatedFileArray = JSON.parse(updatedFiles)
    const filesToUpdate = newFileArray.concat(updatedFileArray)

	filesToUpdate.forEach(file => {
		// console.log("file", file)

		if (file.includes(".md") && !file.includes("README.md") && !file.includes("LICENCE.md") &&  !file.includes("index.md") && !file.includes("overview.md") && !file.includes("ma.md") && !file.includes("ca.md")) {
			const path = file.replace(".md", "")
			const objectID = section + path

			let content = fs.readFileSync(file, "utf8")

			let title = objectID

			if (content.indexOf("#") !== -1) {
				title = content.substring(content.indexOf("# ") + 2, content.indexOf("\n")).trim()

				content.replace(title, "").trim()
				console.log(content)
			}

			const object = {
				objectID,
				title,
				content
			}
			data.push(object)
		}

		// console.log(contents)
	})

	index
		.saveObjects(data)
		.then(w => {
			console.log(w)
		})
		.catch(err => {
			console.log(err)
		})

	// console.log(`The event payload: ${payload}`);
} catch (error) {
	core.setFailed(error.message)
}
