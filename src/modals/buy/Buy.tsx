import React, { FunctionComponent } from 'react';

const Buy: FunctionComponent<{ text: string; }> = ({ text}): JSX.Element => {

    console.log('Buy - text',text);
  return (
    <div className="Buy__text" dangerouslySetInnerHTML={{ __html: text }} />
  )
};

export default Buy;
