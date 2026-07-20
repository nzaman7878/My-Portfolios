const fs = require('fs');

const filePath = 'c:/Users/nuruz/Desktop/My Portfolios/MY Portfolio 2/client/src/components/AdminDashboard.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace all instances of 'Authorization': `Bearer ${token}`
content = content.replace(/'Authorization':\s*`Bearer \$\{token\}`/g, '');

// Clean up empty headers objects
content = content.replace(/headers:\s*\{\s*\}/g, '');

// Clean up trailing commas in headers
content = content.replace(/,\s*\}/g, '}');

// Fix empty objects in fetch like fetch(url, { method: 'DELETE', }) -> fetch(url, { method: 'DELETE' })
// Just clean up double commas or trailing commas
content = content.replace(/,\s*,/g, ',');
content = content.replace(/,\s*\}/g, '}');

// Fix useEffect dependencies
content = content.replace(/\[token\]/g, '[isAdminLoggedIn]');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed AdminDashboard.tsx');
