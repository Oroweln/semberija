import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname } from 'path';

const STATIC_DIR = join(process.cwd(), 'static');
const EXTS = ['.jpg', '.jpeg', '.png'];

// Hero/background images — shown full-width, need more resolution
const HERO_IMAGES = [
  //placeholder
];

const files = readdirSync(STATIC_DIR).filter((f) => EXTS.includes(extname(f).toLowerCase()));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
	const filePath = join(STATIC_DIR, file);
	const sizeBefore = statSync(filePath).size;
	totalBefore += sizeBefore;

	const isHero = HERO_IMAGES.includes(file);
	const isPng = extname(file).toLowerCase() === '.png';

	const maxWidth = isHero ? 1920 : 1000;
	const quality = isHero ? 82 : 78;

	try {
		const instance = sharp(filePath).resize({ width: maxWidth, withoutEnlargement: true });

		let buffer;
		if (isPng) {
			buffer = await instance.png({ compressionLevel: 9, effort: 10 }).toBuffer();
		} else {
			buffer = await instance.jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
		}

		// Only write if we actually made it smaller
		if (buffer.length < sizeBefore) {
			const tmpPath = filePath + '.tmp';
			await sharp(buffer).toFile(tmpPath);
			unlinkSync(filePath);
			renameSync(tmpPath, filePath);
			const sizeAfter = statSync(filePath).size;
			totalAfter += sizeAfter;
			const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0);
			console.log(`  ✓ ${file.padEnd(55)} ${(sizeBefore / 1024 / 1024).toFixed(1)}MB → ${(sizeAfter / 1024).toFixed(0)}KB  (-${saved}%)`);
		} else {
			totalAfter += sizeBefore;
			console.log(`  – ${file} (already optimised, skipped)`);
		}
	} catch (err) {
		totalAfter += sizeBefore;
		console.error(`  ✗ ${file}: ${err.message}`);
	}
}

console.log(
	`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (saved ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
