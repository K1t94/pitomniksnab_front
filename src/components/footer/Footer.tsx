import React, { FunctionComponent } from 'react';

interface IFooterProps {
  email: string;
  phone: string;
  companyInfo: string;
}

const Footer: FunctionComponent<IFooterProps> = ({ phone, email, companyInfo }): JSX.Element => {
  return (
    <div className="Footer">
      <div className="Footer__wrapper">
        <div className="Footer__content">
            <span className="requisites">
                    {companyInfo}
            </span>
        </div>
        <div className="Footer__content">
          <a href={`tel:${phone}`} className="phone">{phone}</a>
          <a href={`mailto:${email}`} className="email">{email}</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
