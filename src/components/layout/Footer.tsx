
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-semibold text-temple-800 mb-3">Dutt Mandir</h3>
            <p className="text-muted-foreground text-sm">
              A place of devotion, peace, and spiritual awakening.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-foreground hover:text-primary transition-colors">
                  Donations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-foreground">123 Temple Street, City, State 12345</li>
              <li className="text-foreground">Email: info@duttmandir.com</li>
              <li className="text-foreground">Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Dutt Mandir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
