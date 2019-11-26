import React from 'react';

export default function AboutCard(props) {
  return (
    <div className="about-card">
      <div
        className="lazy loaded about-card-image"
        style={{
          backgroundImage:
            'url(http://origami.test/wp-content/uploads/2019/02/72390209_p0.jpg)'
        }}
      >
        <img
          className="lazy loaded lazy-bg-loaded-flag"
          src="http://origami.test/wp-content/uploads/2019/02/72390209_p0.jpg"
          alt=""
        />
      </div>
      <div className="about-card-avatar">
        <figure className="avatar avatar-xxl">
          <img
            src="http://2.gravatar.com/avatar/2042da87de7f34a690887aef7f208ecb?s=96&amp;d=mm&amp;r=g"
            className="lazy loaded"
            alt=""
          />
        </figure>
      </div>
      <div className="about-card-content">
        <h5>syfxlin</h5>
        user_descriptionuser_descriptionuser_descriptionuser_description
      </div>
    </div>
  );
}
