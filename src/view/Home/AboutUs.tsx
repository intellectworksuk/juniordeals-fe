import { useScrollToTop } from '../../hooks/useScrollToTop'
import aboutUs from '../assets/img/about-us.jpg'
import promosingValues from '../assets/img/promising-values.jpg'

export const AboutUsPage = () => {
  
  useScrollToTop();

  return (
    <>
      <div className="company-block">
        {/* <div className="row">
          <div className="col-md-12">
            <h2 className="text-center headingPrimary">About Junior Deals</h2>
          </div>
        </div> */}
        <div className="row" style={{ marginTop: '48px' }}>
          <div className="col-lg-6 col-md-6">
            <img className="img-rounded" width="100%" src={aboutUs} />
          </div>
          <div className="col-lg-6 col-md-6">
            <h2 className="headingPrimary">About Junior Deals</h2>
            <p>
              Junior Deals (JD) is an application that teaches children the
              value of responsible financial decision-making and safe bartering.
              It aims to encourage the youth of the United Kingdom to step up,
              take on duty, and appreciate the value of their belongings.
              Parents in the United Kingdom represent a vast market that
              requires an efficient means of instilling a sense of responsible
              saving and appreciation of assets in their children. Junior Deals
              gives youngsters in the United Kingdom good value fostering the
              development of young minds and promote interaction between
              children and their parents.
              <br />
            </p>
          </div>
        </div>
        <div className="row" style={{ marginTop: '48px' }}>
          <div className="col-lg-6 col-md-6">
            <h2 className="headingPrimary">Promising Values</h2>
            <br />
            <p>
              Junior Deals aims to instill following healthy values in children:
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Resilience:
              </span>
            </h4>
            <p>
              Junior Deals instils resilience in children so that they can
              overcome extreme hardships.
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Time management:
              </span>
            </h4>
            <p>
              Time management is a vital skill for children; therefore, Junior
              Deals enable them to prioritise work and complete it without
              feeling overwhelmed.
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Innovation and creativity:
              </span>
            </h4>
            <p>
              Junior Deals is a self-sufficient platform that fosters innovation
              and creativity among children. It provides an extraordinary
              opportunity for children to express their creativity.
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Sense of initiating:
              </span>
            </h4>
            <p>
              Junior Deals enables children to have pleasant experiences in
              which they acquire a sense of themselves as significant and
              respected and a sense of belonging; consequently, they communicate
              more effectively.
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Optimistic approach:
              </span>
            </h4>
            <p>
              Junior Deals instill in children an attitude that promotes
              optimism and self-determination. Children learn that constant
              effort and diligence result in excellent rewards in such an
              environment.
              <br />
            </p>
            <h4>
              <span
                style={{
                  font: 'verdana',
                  fontWeight: 'bold',
                  color: '#fed639',
                }}
              >
                Negotiation:
              </span>
            </h4>
            <p>
              Communication is essential to the negotiation process. The way of
              communication determines the result; therefore, Junior Deals
              teaches the children such skills that they adopt the solutions to
              various problems.
              <br />
            </p>
          </div>
          <div className="col-lg-6 col-md-6">
            <img className="img-rounded" width="100%" src={promosingValues} />
          </div>
        </div>
        <hr />
        {/* <div className="row" style={{ marginTop: "48px" }}>
          <div className="col-md-12">
            <h2 className="text-center headingPrimary">
              Team Beahind Junior Deals
            </h2>
            <h4 className="text-center">
              We are not just four individual person; but together we are
              fantastic!
            </h4>
          </div>
        </div>
        <div className="row" style={{ marginTop: "48px" }}>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
            <img
              className="img-circle"
              src="https://randomuser.me/api/portraits/women/95.jpg"
            />
            <h3>Sarah</h3>
            <h4>C.E.O</h4>
            <hr />
            <p>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              sit amet efficitur risus. Vestibulum sit amet elementum magna,
              lobortis tempor orci. Pellentesque pretium interdum consequat. Sed
              euismod lacinia dolor nec gravida. Aenean lectus quam, efficitur
              sed nisl ac, facilisis ultricies tortor.
              <br />
            </p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
            <img
              className="img-circle"
              src="https://randomuser.me/api/portraits/men/97.jpg"
            />
            <h3>Ed</h3>
            <h4>C.O.O</h4>
            <hr />
            <p>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              sit amet efficitur risus. Vestibulum sit amet elementum magna,
              lobortis tempor orci. Pellentesque pretium interdum consequat. Sed
              euismod lacinia dolor nec gravida. Aenean lectus quam, efficitur
              sed nisl ac, facilisis ultricies tortor.
              <br />
            </p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
            <img
              className="img-circle"
              src="https://randomuser.me/api/portraits/men/29.jpg"
            />
            <h3>Edd</h3>
            <h4>Marketing Head</h4>
            <hr />
            <p>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              sit amet efficitur risus. Vestibulum sit amet elementum magna,
              lobortis tempor orci. Pellentesque pretium interdum consequat. Sed
              euismod lacinia dolor nec gravida. Aenean lectus quam, efficitur
              sed nisl ac, facilisis ultricies tortor.
              <br />
            </p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
            <img
              className="img-circle"
              src="https://randomuser.me/api/portraits/men/86.jpg"
            />
            <h3>Eddy</h3>
            <h4>Customer Relations</h4>
            <hr />
            <p>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              sit amet efficitur risus. Vestibulum sit amet elementum magna,
              lobortis tempor orci. Pellentesque pretium interdum consequat. Sed
              euismod lacinia dolor nec gravida. Aenean lectus quam, efficitur
              sed nisl ac, facilisis ultricies tortor.
              <br />
            </p>
          </div>
        </div> */}
      </div>
    </>
  )
}
