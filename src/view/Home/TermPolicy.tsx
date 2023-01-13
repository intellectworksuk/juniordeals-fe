import { PageHeader } from "../Layout";
import bannerImg from "../../view/assets/img/banner.jpg";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

export const TermsPolicyPage = () => {
  useScrollToTop();

  return (
    <>
      <div className="text-center">
        <h2 className="headingPrimary">
          GENERAL TERMS & CONDITIONS
          <br />
          <small className="subHeading">Review terms & conditions</small>
          <br />
        </h2>
      </div>
      <hr />
      <div className="container" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col-lg-6">
            <h2>Independent Representative: </h2>
            <p style={{ textAlign: "justify" }}>
              Subject to the terms and conditions of this Agreement, the
              Supplier hereby engages the Representative as an independent
              Representative to perform the services set forth herein, and the
              Representative hereby accepts such engagement. This Agreement
              shall not render the Representative an employee, partner, agent
              of, or joint venture with the Supplier for any purpose. The
              Representative shall remain an independent Representative in
              his/her relationship to the Supplier. The Representative shall
              have no claim against the Supplier hereunder or otherwise for
              vacation pay, sick leave, retirement benefits, social security,
              worker’s compensation, health or disability benefits, unemployment
              insurance benefits, or employment benefits of any kind.
            </p>

            <h2>Expenses</h2>
            <p style={{ textAlign: "justify" }}>
              During the term of this Agreement, the Representative shall bill,
              and the Supplier shall reimburse him/her for all reasonable and
              approved out-of-pocket expenses that are incurred in connection
              with the performance of the duties or meeting or factory visit
              hereunder, if requested by supplier.
            </p>

            <h2>Confidentiality </h2>
            <p style={{ textAlign: "justify" }}>
              The Representative acknowledges that during the engagement he/she
              shall have access to and become acquainted with various trade
              secrets, inventions, innovations, processes, information, records,
              and specifications owned or licensed by the Supplier and/or used
              by the Supplier in connection with the operation of its business
              including, without limitation, the Supplier’s business and product
              processes, methods, customer lists, accounts, and procedures. The
              Representative agrees that he/she shall not disclose any of the
              aforesaid, directly or indirectly, or use any of them in any
              manner, either during the term of this Agreement or at any time
              thereafter, except as required in the course of this engagement
              with the Supplier. All files, records, documents, blueprints,
              specifications, information, letters, notes, media lists, original
              artwork/creative, notebooks, and similar items relating to the
              business of the Supplier, whether prepared by the Representative
              or otherwise coming into his/her possession, shall remain the
              exclusive property of the Supplier. The Representative shall not
              retain any copies of the foregoing without the Supplier’s prior
              written permission. Upon the expiration or earlier termination of
              this Agreement, or whenever requested by the Supplier, the
              Representative shall immediately deliver to the Supplier all such
              files, records, documents, specifications, information, and other
              items in his/her possession or under his/her control. The
              Representative further agrees that he/she shall not disclose
              his/her retention as an independent Representative or the terms of
              this Agreement to any person without the prior written consent of
              the Supplier and shall always preserve the confidential nature of
              his/her relationship to the Supplier and of the services
              hereunder.
            </p>

            <h2>Release and Indemnification</h2>
            <p style={{ textAlign: "justify" }}>
              The Supplier hereby releases and agrees to hold harmless, defend
              and indemnify the Representative , from any and all claims,
              actions, proceedings, suits, liabilities, damages (actual,
              consequential, or incidental), settlements, penalties, fines,
              costs or expenses (including without limitation, reasonable
              attorney’s fees and other litigation expenses) of every kind,
              whether known or unknown, incurred by the Supplier arising out of
              this Agreement.
            </p>

            <h2>Limitation of Liability</h2>
            <p style={{ textAlign: "justify" }}>
              In no event shall the Representative be liable for indirect,
              special or consequential damage suffered by the Supplier in
              connection, directly or indirectly, with the action or inaction of
              the Representative under or in relation to this Agreement.
            </p>
          </div>

          <div className="col-lg-6">
            <h2>Right to Injection</h2>
            <p style={{ textAlign: "justify" }}>
              The parties hereto acknowledge that the services to be rendered by
              the Representative under this Agreement and the rights and
              privileges granted to the Supplier under the Agreement are of a
              special, unique, unusual, and extraordinary character which gives
              them a peculiar value, the loss of which cannot be reasonably or
              adequately compensated by damages in any action at law, and the
              breach by the Representative of any of the provisions of this
              Agreement will cause the Supplier irreparable injury and damage.
              The Representative expressly agrees that the Supplier shall be
              entitled to injunctive and other equitable relief in the event of,
              or to prevent, a breach of any provision of this Agreement by the
              Representative. Resort to such equitable relief, however, shall
              not be construed to be a waiver of any other rights or remedies
              that the Supplier may have for damages or otherwise. The various
              rights and remedies of the Supplier under this Agreement or
              otherwise shall be construed to be cumulative, and no one of them
              shall be exclusive of any other or of any right or remedy allowed
              by law.
            </p>

            <h2>Merger</h2>
            <p style={{ textAlign: "justify" }}>
              The merger or consolidation of the Supplier into or with any other
              entity shall not terminate this Agreement.
            </p>

            <h2>Termination</h2>
            <p style={{ textAlign: "justify" }}>
              Either party may terminate this Agreement at any time by thirty
              (30) days’ written notice to the other party. In addition, if the
              Supplier/Representative is convicted of any crime, fails or
              refuses to comply with the written policies or reasonable
              directive of the Company, is guilty of serious misconduct in
              connection with performance hereunder, or materially breaches
              provisions of this Agreement, the Supplier/representative at any
              time may terminate the engagement of the Representative
              immediately and without prior written notice to the Representative
              .
            </p>

            <h2>Choice of LAW</h2>
            <p style={{ textAlign: "justify" }}>
              All Terms and Condition of this agreement shall be governed and
              interpret in accordance with laws of England & Wales and/or
              Pakistan and the parties submit to the exclusive Jurisdiction of
              the England & Wales courts and/or Pakistan Court.
            </p>

            <h2>Dispute Resolution</h2>
            <p style={{ textAlign: "justify" }}>
              Any dispute arising out of or in connection with this Agreement,
              including any question regarding its existence, validity or
              termination, shall be referred to and finally resolved by
              arbitration under the Arbitration Rules of the United Kingdom
              Arbitration Centre, which Rules are deemed to be incorporated by
              reference into this clause. The number of arbitrators shall be
              one. The seat, or legal place, of arbitration, shall be London,
              United Kingdom. The language to be used in the arbitration shall
              be English. The governing law of the contract shall be the
              substantive law of United Kingdom.
            </p>

            <h2>Headings</h2>
            <p style={{ textAlign: "justify" }}>
              Section headings are not to be considered a part of this Agreement
              and are not intended to be a full and accurate description of the
              contents hereof.
            </p>

            <h2>Waiver</h2>
            <p style={{ textAlign: "justify" }}>
              Waiver by one party hereto of a breach of any provision of this
              Agreement by the other shall not operate or be construed as a
              continuing waiver.
            </p>

            <h2>Modification or Amendment</h2>
            <p style={{ textAlign: "justify" }}>
              No amendment, change, or modification of this Agreement shall be
              valid unless in writing signed by the parties hereto.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h2>Data Loss </h2>
            <p style={{ textAlign: "justify" }}>
              The Supplier understands that there are inherent risks in
              providing support to computer systems which include but are not
              limited to data loss, data corruption, or complete loss of files
              or directories. The Supplier agrees that the Representative shall
              not be held liable for damages in the case of data loss
            </p>

            <h2>Force Majeure</h2>
            <p style={{ textAlign: "justify" }}>
              The Representative shall be excused from performance to the extent
              that performance is prevented, delayed, or obstructed by causes
              beyond the Representative ’s reasonable control, including delays
              in performance by the Company, acts of Nature (fire, storm,
              floods, earthquakes, etc.) civil disturbances, disruption of
              telecommunications, power or essential services.
            </p>

            <h2>Entire Agreement</h2>
            <p style={{ textAlign: "justify" }}>
              This document constitutes the entire agreement between the
              parties, and any and all prior agreements, understandings, and
              representations are hereby terminated and cancelled in their
              entirety and shall be of no further force and effect.
            </p>

            <h2>Unenforceability of Provisions</h2>
            <p style={{ textAlign: "justify" }}>
              If any provision of this Agreement, or any portion thereof, is
              held to be invalid and unenforceable, then the remainder of this
              Agreement shall nevertheless remain in full force and effect.
            </p>

            <h2>Third Party Agreement </h2>
            <p style={{ textAlign: "justify" }}>
              The Representative shall responsible to appoint the distribution
              partner, develop the business and execute the sales & marketing
              activities and signed the business development agreement with
              third parties on behalf of Supplier.
            </p>

            <h2>Deliverable’s</h2>
            <p style={{ textAlign: "justify" }}>
              The Supplier shall respond to deliver the Product samples videos,
              presentation, Product costing and other related material as agreed
              date and location to the appointed distribution partner as per
              followed by the Representative guidelines. Product samples should
              be delivered upon Appointed distribution partner purchase order on
              factory price.
            </p>

            <h2>Duties, Term, and Compensation</h2>
            <p style={{ textAlign: "justify" }}>
              The Representative ’s duties, the term of engagement,
              compensation, and provisions for payment thereof shall be as set
              forth below, which can be amended in writing from time to time or
              supplemented with subsequent estimates for services to be rendered
              by the Representative and agreed to by the Supplier. The
              Representative shall be paid at the rates agreed for the Work
              performed in accordance with this agreement unless otherwise
              agreed to in writing.{" "}
            </p>
          </div>
          <div className="col-lg-6">
            <h2>Supplier Information</h2>
            <p style={{ textAlign: "justify" }}>
              The Supplier shall agree to promptly disclose to The
              Representative in a timely manner those events/discoveries which
              are known and/or anticipated that may reasonably be expected to
              have an impact on the stock, business operations, future business,
              or public perception of supplier, as this has a material impact on
              the ability and effectiveness of The Representative and service
              rendered.
            </p>

            <h2>Contract Modification </h2>
            <p style={{ textAlign: "justify" }}>
              This Agreement and attached schedules constitute the entire
              contract of the parties with respect to the matters addressed
              herein and no modifications of this Agreement shall be enforceable
              unless in writing signed by both The Representative and The
              Supplier. This agreement is not assignable by either party without
              the consent of the other.
            </p>

            <h2>New/Existing Brand/Category Extension</h2>
            <p style={{ textAlign: "justify" }}>
              The Supplier shall not engage directly to introduce Any or other
              new Brand/Category with Appointed distribution partner in same
              country without permission of the Representative.
            </p>

            <h2>Notices</h2>
            <p style={{ textAlign: "justify" }}>
              Any and all notices, demands, or other communications required or
              desired to be given hereunder by any party shall be in writing and
              shall be validly given or made to another party if personally
              served or if deposited in the United Kingdom mail. If such notice
              or demand is served personally, notice shall be deemed
              constructively made at the time of such personal service. If such
              notice, demand, or other communication is given by mail, such
              notice shall be conclusively deemed given five days after deposit
              thereof in the United Kingdom mail addressed to the party to whom
              such notice, demand, or other communication is to be given as
              follows:
            </p>

            <p style={{ textAlign: "justify" }}>If to the Representative:</p>

            <p style={{ textAlign: "justify" }}>
              <strong>Intelligence De Marque</strong>
              <br />
              408 West Green Road London, England, N15 3PX
            </p>

            <p style={{ textAlign: "justify" }}>
              Any party hereto may change its address for purposes of this
              paragraph by written notice given in the manner provided above.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
