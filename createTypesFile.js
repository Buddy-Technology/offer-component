const fs = require('fs');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

const writeTypesFile = async () => {
	try {
		// this runs jsdoc to create types file.
		await exec('jsdoc src -t node_modules/tsd-jsdoc/dist --private -d lib -c jsdoc.config.json');

		// now we amend it real quick. It's annoying we have to do this, but I haven't found a better solution.
		const raw = fs.readFileSync('./lib/types.d.ts', 'utf8');
		const str = 'export = BuddyOfferElement';
		const fixed = `${str}\n\n${raw.replace(/"/g, '')}`;
		fs.writeFileSync('./lib/types.d.ts', fixed, 'utf8');
	} catch (error) {
		console.error(error);
	}
};

writeTypesFile();
