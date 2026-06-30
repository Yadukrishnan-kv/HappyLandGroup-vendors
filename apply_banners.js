const fs = require('fs');
const path = require('path');

const stylesText = `
const styles = {
  hero: {
    height: '400px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '800',
    color: 'white',
    position: 'relative',
    zIndex: 1,
  }
};
`;

// 1. Contact.jsx
const contactPath = path.join(__dirname, 'client', 'src', 'pages', 'Contact.jsx');
let contactContent = fs.readFileSync(contactPath, 'utf8');

// The AI injected a bad styles object in Contact.jsx. Let's remove it and put the right one at the bottom.
contactContent = contactContent.replace(/const styles = {[\s\S]*?};/, '');
contactContent = contactContent.replace('export default Contact;', stylesText + '\nexport default Contact;');

// Fix the banner content in Contact.jsx (it was replaced correctly but we just need to be sure)
fs.writeFileSync(contactPath, contactContent);

// 2. CategoryTours.jsx
const catPath = path.join(__dirname, 'client', 'src', 'pages', 'CategoryTours.jsx');
let catContent = fs.readFileSync(catPath, 'utf8');

const oldHeroStart = catContent.indexOf('{/* Category Hero / Editorial Header */}');
const oldHeroEnd = catContent.indexOf('</section>', oldHeroStart) + 10;

if (oldHeroStart !== -1) {
  const newHero = `{/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.heroTitle}>
          {categoryName?.toLowerCase() === 'uae-tours' ? 'UAE' : 'International'} <span style={{color: 'var(--primary)'}}>Tours</span>
        </h1>
      </section>`;
  
  catContent = catContent.substring(0, oldHeroStart) + newHero + catContent.substring(oldHeroEnd);
  
  if (!catContent.includes('const styles = {')) {
    catContent = catContent.replace('export default CategoryTours;', stylesText + '\nexport default CategoryTours;');
    // Also if CategoryTours doesn't have an export default at the end but just inline export...
    if (!catContent.includes('export default CategoryTours')) {
       catContent += '\n' + stylesText;
    }
  }
  
  fs.writeFileSync(catPath, catContent);
}

console.log("Banners applied.");
