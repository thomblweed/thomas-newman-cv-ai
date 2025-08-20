import { ContactInfo } from './components/contact-info';

interface FooterProps {
  footerText: string;
}

export const Footer = ({ footerText }: FooterProps) => (
  <footer className="py-4 px-0">
    <div className="content-view">
      <div className="flex gap-6 items-center">
        <div>
          <p className="p-0 text-primary">{footerText}</p>
          <p className="p-0 text-xs text-secondary">
            Copyright &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div>
          <ContactInfo />
        </div>
      </div>
    </div>
  </footer>
);
