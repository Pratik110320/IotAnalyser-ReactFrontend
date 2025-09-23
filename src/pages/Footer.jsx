import React from 'react';


export default function Footer() {
return (
<footer className="site-footer" id="contact">
<div className="footer-inner">
<div>© {new Date().getFullYear()} IoT Analyser</div>
<div className="footer-links">
<a href="#">Privacy</a>
<a href="#">Terms</a>
</div>
</div>
</footer>
);
}