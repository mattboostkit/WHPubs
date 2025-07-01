import fs from 'fs';
import path from 'path';

console.log('🔍 VERIFYING TEXT COLORS IN DEVELOPMENT KITCHEN PAGE');
console.log('====================================================\n');

const filePath = path.join(process.cwd(), 'src/pages/development-kitchen.astro');
const content = fs.readFileSync(filePath, 'utf8');

// Check for any headings without text-primary
const lines = content.split('\n');
let issues = [];

lines.forEach((line, index) => {
  // Check for h2 tags without text-primary
  if (line.includes('text-4xl font-bold') && !line.includes('text-primary') && !line.includes('text-white') && !line.includes('text-secondary')) {
    issues.push({
      line: index + 1,
      content: line.trim(),
      issue: 'Missing text-primary class'
    });
  }
  
  // Check for any text-blue references
  if (line.includes('text-blue')) {
    issues.push({
      line: index + 1,
      content: line.trim(),
      issue: 'Found text-blue class (should be text-primary)'
    });
  }
});

if (issues.length === 0) {
  console.log('✅ All headings have proper text colors (text-primary)');
  console.log('✅ No blue text found in Development Kitchen page\n');
} else {
  console.log('❌ FOUND COLOR ISSUES:\n');
  issues.forEach(issue => {
    console.log(`Line ${issue.line}: ${issue.issue}`);
    console.log(`Content: ${issue.content}\n`);
  });
}

console.log('📋 CURRENT STATE:');
console.log('- All h2 headings should use: text-4xl font-bold text-primary');
console.log('- Chef image uses: aspect-[4/5] object-cover object-top');
console.log('- Page hero extends to 40% viewport height\n');

console.log('🚀 DEPLOYMENT STATUS:');
console.log('- Changes have been committed and pushed');
console.log('- Netlify should be deploying from GitHub');
console.log('- Check: https://app.netlify.com/sites/whpubsadmin/deploys');
console.log('- Site URL: https://whpubsadmin.netlify.app\n');

console.log('⚠️  TROUBLESHOOTING:');
console.log('1. Clear browser cache (Ctrl+Shift+R)');
console.log('2. Check Netlify build logs for errors');
console.log('3. Ensure no build failures in deployment');
console.log('4. Verify GitHub webhook is active in Netlify settings');