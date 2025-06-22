import React from 'react';
import about from "../../assets/background/about.jpg";

const Contact = () => {
    return (
        <section className="section">
            <article className="section-block">
                <div className="container">
                    <div className="new-big-container">
                        <div className="new-container">
                            <div className="concat_container">
                                <h1 className="contact_header_desc">Contacts</h1>
                                <iframe
                                    style={{
                                        width: "100%",
                                        height: "340px",
                                        border: "0",
                                        allowFullScreen: "",
                                        loading: "lazy"
                                    }}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d269.41996008668184!2d43.843547046207256!3d40.7855895836473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041fbedb78169af%3A0x9688d481af79919a!2sTechno-Educational%20Academy!5e0!3m2!1sru!2sam!4v1744637937194!5m2!1sru!2sam"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>


                                <span className="contact_name">
              Multify Market
          </span>


                                <div className="contact_big_description">
                                    <div className="contact_desc">
                                        <div className="contact_mini_desc">
                                              <span className="contact_mini_desc_text">
                                                     Office address
                                                      </span>
                                            <span className="contact_mini_desc_text">
                                                 4 Tsulukidze St, Gyumri
                                            </span>
                                        </div>
                                    </div>
                                    {/*<div className="contact_desc">*/}
                                    {/*    <div className="contact_mini_desc">*/}
                                    {/*        <span className="contact_mini_desc_text">OGRN: 1047796688554</span>*/}
                                    {/*        <span className="contact_mini_desc_text">INN 7703528301</span>*/}
                                    {/*        <span className="contact_mini_desc_text">KPP 774850001</span>*/}
                                    {/*        <span className="contact_mini_desc_text">OKTMO 45380000</span>*/}
                                    {/*        <span className="contact_mini_desc_text">OGRN 1047796688554</span>*/}
                                    {/*        <span className="contact_mini_desc_text">Current ruble account: 40702810900001403352</span>*/}
                                    {/*        <span className="contact_mini_desc_text">Bank: JSC Sberbank</span>*/}
                                    {/*        <span className="contact_mini_desc_text">Moscow</span>*/}
                                    {/*        <span className="contact_mini_desc_text">Correspondent account: 30101810200000000700</span>*/}
                                    {/*        <span className="contact_mini_desc_text">BIC: 044525700</span>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="contact_mini_desc">
                                            <span className="contact_mini_desc_text">
                        Made in
                </span>
                                        <span className="contact_mini_desc_text">
                      Techno-Educational Academy
                </span>
                                    </div>

                                    <div className="contact_desc">
                                        <div className="contact_mini_desc">
                <span className="contact_mini_desc_text">
                 Customer support Multifymarket@gmail.com
                </span>
                                        </div>
                                    </div>
                                </div>

                                <article className="article-home" style={{
                                    padding:0,
                                }}>
                                    <div className="article-block-img">
                                        <div className="about-home">
                                            <h2>About the company</h2>
                                            <p>At MultifyMarket you can always buy all the necessary goods for home and
                                                garden
                                                renovation. Want to renovate your apartment? Are you building a country
                                                house? Use
                                                construction and finishing materials from our catalog.
                                            </p>
                                            <p>
                                                Fast delivery of construction goods at low prices will make your
                                                shopping more
                                                enjoyable. Renovation can be cheap if you do it with us. We always have
                                                more than
                                                30,000 construction goods in stock for you at low prices every day.
                                                MultifyMarket is
                                                a wide range of goods for home and renovation at a low price;
                                                Possibility to order
                                                construction and finishing materials for home and garden.</p>
                                        </div>
                                        <img className="img" src={about}/>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Contact;
