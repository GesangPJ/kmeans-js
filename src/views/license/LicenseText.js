// ** Import Modules
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'


const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const LinceseText = () => {
  return (
    <Card>
      <CardHeader title='' titleTypographyProps={{ variant: 'h3' }} position="center" />
      <CardContent>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <DemoGrid item xs={12} sm={10}>
            <Typography variant='body 1' >
              <p style={{ marginBottom: '10px' }}>
                This project <b>"KATALOG OBAT"</b> is licensed under CC-BY-NC-ND-4.0 :
              </p>
            </Typography><br></br>

            {/*'CC-BY-NC-ND-4.0'*/}
            <Typography variant='h4' align='center'>
              Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License
            </Typography>
          </DemoGrid>
        </Grid>
        <br></br>
        <br></br>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'}>
          <DemoGrid item xs={5} sm={9}>

            <Typography variant='body 1' >
              <p style={{ marginBottom: '10px' }}>
                By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of
                this Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License ("Public License").
                To the extent this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration
                of Your acceptance of these terms and conditions, and the Licensor grants You such rights in consideration
                of benefits the Licensor receives from making the Licensed Material available under these terms and conditions.
              </p>
            </Typography>
          </DemoGrid>
        </Grid><br></br>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'}>
          <DemoGrid item xs={5} sm={9}>
            {/*'Section 1'*/}
            <Typography variant='h6' align="left">
              <b>Section 1 – Definitions.</b>
            </Typography>
            <Typography variant='body1'>
              <ol type="a">
                <li style={{ marginBottom: '10px' }}>
                  <b>Adapted Material</b> means material subject to Copyright and Similar Rights that is derived
                  from or based upon the Licensed Material and in which the Licensed Material is translated,
                  altered, arranged, transformed, or otherwise modified in a manner requiring permission under
                  the Copyright and Similar Rights held by the Licensor. For purposes of this Public License,
                  where the Licensed Material is a musical work, performance, or sound recording,
                  Adapted Material is always produced where the Licensed Material is synched in timed relation with a moving image.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Copyright and Similar Rights</b> means copyright and/or similar rights closely related to copyright including, without limitation, performance, broadcast,
                  sound recording, and Sui Generis Database Rights,
                  without regard to how the rights are labeled or categorized.
                  For purposes of this Public License, the rights specified in Section 2(b)(1)-(2) are not Copyright and Similar Rights.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Effective Technological Measures</b> means those measures that, in the absence of proper authority,
                  may not be circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright Treaty adopted on
                  December 20, 1996, and/or similar international agreements.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Exceptions and Limitations</b> means fair use, fair dealing, and/or any other exception or limitation to
                  Copyright and Similar Rights that applies to Your use of the Licensed Material.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Licensed Material</b> means the artistic or literary work, database, or other material to which the Licensor applied this Public License.
                </li>
                <li>
                  <b>Licensed Rights</b> means the rights granted to You subject to the terms and conditions of this Public License, which are limited to all Copyright and
                  Similar Rights that apply to Your use of the Licensed Material and that the Licensor has authority to license.
                </li>
                <li>
                  <b>Licensor</b> means the individual(s) or entity(ies) granting rights under this Public License.
                </li>
                <li>
                  <b>NonCommercial</b> means not primarily intended for or directed towards commercial advantage
                  or monetary compensation. For purposes of this Public License, the exchange of the Licensed Material
                  for other material subject to Copyright and Similar Rights by digital file-sharing or similar means
                  is NonCommercial provided there is no payment of monetary compensation in connection with the exchange.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Share</b> means to provide material to the public by any means or process that requires permission under
                  the Licensed Rights, such as reproduction, public display, public performance, distribution, dissemination,
                  communication, or importation, and to make material available to the public including in ways that members
                  of the public may access the material from a place and at a time individually chosen by them.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Sui Generis Database Rights</b> means rights other than copyright resulting from Directive 96/9/EC
                  of the European Parliament and of the Council of 11 March 1996 on the legal protection of databases,
                  as amended and/or succeeded, as well as other essentially equivalent rights anywhere in the world.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>You</b> means the individual or entity exercising the Licensed Rights under this Public License.
                  <b>Your</b> has a corresponding meaning.
                </li>
              </ol>
            </Typography>
            {/*'Section 2'*/}
            <Typography variant='h6' align="left">
              <b>Section 2 – Scope.</b>
            </Typography>
            <Typography variant='body1'>
              <ol type="a" style={{ marginBottom: '10px' }}>
                <li>
                  <b>License grant.</b>
                  <ol type="1" style={{ marginBottom: '10px' }}><br></br>
                    <li style={{ marginBottom: '10px' }}>
                      Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide,
                      royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights
                      in the Licensed Material to:
                      <ol type="A">
                        <li>
                          reproduce and Share the Licensed Material, in whole or in part, for NonCommercial purposes only; and
                        </li>
                        <li>
                          produce and reproduce, but not Share, Adapted Material for NonCommercial purposes only.
                        </li>
                      </ol>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <u>Exceptions and Limitations.</u>  For the avoidance of doubt, where Exceptions and Limitations apply to Your use,
                      this Public License does not apply, and You do not need to comply with its terms and conditions.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <u>Term.</u> The term of this Public License is specified in Section 6(a).
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <u>Media and formats; technical modifications allowed.</u> The Licensor authorizes You to exercise the Licensed
                      Rights in all media and formats whether now known or hereafter created, and to make technical modifications necessary to do so.
                      The Licensor waives and/or agrees not to assert any right or authority to forbid You from making technical modifications
                      necessary to exercise the Licensed Rights, including technical modifications necessary to circumvent Effective Technological
                      Measures. For purposes of this Public License, simply making modifications authorized by this Section 2(a)(4) never produces
                      Adapted Material.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <u>Downstream recipients.</u>
                      <ol style={{ marginBottom: '10px' }} type="A">
                        <li style={{ marginBottom: '10px' }}>
                          <u>Offer from the Licensor – Licensed Material.</u> Every recipient of the Licensed Material automatically receives
                          an offer from the Licensor to exercise the Licensed Rights under the terms and conditions of this Public License.
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <u>No downstream restrictions.</u> You may not offer or impose any additional or different terms or conditions on,
                          or apply any Effective Technological Measures to, the Licensed Material if doing so restricts exercise of the
                          Licensed Rights by any recipient of the Licensed Material.
                        </li>
                      </ol>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <u>No endorsement.</u> Nothing in this Public License constitutes or may be construed as permission to assert
                      or imply that You are, or that Your use of the Licensed Material is, connected with, or sponsored, endorsed,
                      or granted official status by, the Licensor or others designated to receive attribution as provided in Section 3(a)(1)(A)(i).
                    </li>
                  </ol>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <b>Other rights.</b>
                  <ol style={{ marginBottom: "10px" }} type="1"><br></br>
                    <li style={{ marginBottom: '10px' }}>
                      Moral rights, such as the right of integrity, are not licensed under this Public License, nor are publicity,
                      privacy, and/or other similar personality rights; however, to the extent possible, the Licensor waives and/or
                      agrees not to assert any such rights held by the Licensor to the limited extent necessary to allow You to exercise
                      the Licensed Rights, but not otherwise.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      Patent and trademark rights are not licensed under this Public License.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      To the extent possible, the Licensor waives any right to collect royalties from You for the exercise of the Licensed Rights,
                      whether directly or through a collecting society under any voluntary or waivable statutory or compulsory licensing scheme.
                      In all other cases the Licensor expressly reserves any right to collect such royalties, including when the Licensed Material
                      is used other than for NonCommercial purposes.
                    </li>
                  </ol>
                </li>
              </ol>
            </Typography>
            {/*'Section 3'*/}
            <Typography variant='h6' align="left">
              <b>Section 3 – License Conditions.</b>
            </Typography>
            <Typography variant='body1'>
              Your exercise of the Licensed Rights is expressly made subject to the following conditions.
              <ol type="a" style={{ marginBottom: '10px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <b>Attribution</b>
                  <ol type="1" style={{ marginBottom: '10px' }}>
                    <li style={{ marginBottom: '10px' }}>
                      If You Share the Licensed Material, You must:
                      <ol type="A"><br></br>
                        <li style={{ marginBottom: '10px' }}>
                          retain the following if it is supplied by the Licensor with the Licensed Material:
                          <ol type="i">
                            <li>
                              identification of the creator(s) of the Licensed Material and any others designated
                              to receive attribution, in any reasonable manner requested by the Licensor
                              (including by pseudonym if designated);
                            </li>
                            <li>
                              a copyright notice;
                            </li>
                            <li>
                              a notice that refers to this Public License;
                            </li>
                            <li>
                              a notice that refers to the disclaimer of warranties;
                            </li>
                            <li>
                              a URI or hyperlink to the Licensed Material to the extent reasonably practicable;
                            </li>
                          </ol>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          indicate if You modified the Licensed Material and retain an indication of any previous modifications; and
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          indicate the Licensed Material is licensed under this Public License, and include the text of, or the URI or hyperlink to, this Public License.
                        </li>
                      </ol>
                      For the avoidance of doubt, You do not have permission under this Public License to Share Adapted Material.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      You may satisfy the conditions in Section 3(a)(1) in any reasonable manner based on the medium, means,
                      and context in which You Share the Licensed Material. For example, it may be reasonable to satisfy the conditions
                      by providing a URI or hyperlink to a resource that includes the required information.
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A)
                      to the extent reasonably practicable.
                    </li>
                  </ol>
                </li>
              </ol>
            </Typography>
            {/*'Section 4'*/}
            <Typography variant='h6' align="left">
              <b>Section 4 – Sui Generis Database Rights.</b>
            </Typography>
            <Typography variant='body1'>
              Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of the Licensed Material:
              <ol type="a">
                <li style={{ marginBottom: '10px' }}>
                  for the avoidance of doubt, Section 2(a)(1) grants You the right to extract, reuse, reproduce,
                  and Share all or a substantial portion of the contents of the database for NonCommercial purposes
                  only and provided You do not Share Adapted Material;
                </li>
                <li style={{ marginBottom: '10px' }}>
                  if You include all or a substantial portion of the database contents in a database in which You have Sui
                  Generis Database Rights, then the database in which You have Sui Generis Database Rights
                  (but not its individual contents) is Adapted Material; and
                </li>
                <li style={{ marginBottom: '10px' }}>
                  You must comply with the conditions in Section 3(a) if You Share all or a substantial portion of the
                  contents of the database.
                </li>
              </ol>
              For the avoidance of doubt, this Section 4 supplements and does not replace Your obligations under this Public
              License where the Licensed Rights include other Copyright and Similar Rights.
            </Typography>
            {/*'Section 5'*/}
            <Typography variant='h6' align="left">
              <b>Section 5 – Disclaimer of Warranties and Limitation of Liability.</b>
            </Typography>
            <Typography variant='body1'>

              <ol type="a">
                <b>
                  <li style={{ marginBottom: '10px' }}>
                    Unless otherwise separately undertaken by the Licensor, to the extent possible, the Licensor offers the Licensed
                    Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed
                    Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title,
                    merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy,
                    or the presence or absence of errors, whether or not known or discoverable. Where disclaimers of warranties are not
                    allowed in full or in part, this disclaimer may not apply to You.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    To the extent possible, in no event will the Licensor be liable to You on any legal theory (including, without limitation,
                    negligence) or otherwise for any direct, special, indirect, incidental, consequential, punitive, exemplary, or other losses,
                    costs, expenses, or damages arising out of this Public License or use of the Licensed Material, even if the Licensor has been
                    advised of the possibility of such losses, costs, expenses, or damages. Where a limitation of liability is not allowed in full
                    or in part, this limitation may not apply to You.
                  </li></b>
                <li style={{ marginBottom: '10px' }}>
                  The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner that, to the extent possible,
                  most closely approximates an absolute disclaimer and waiver of all liability.
                </li>
              </ol>
            </Typography>
            {/*'Section 6'*/}
            <Typography variant='h6' align="left">
              <b>Section 6 – Term and Termination.</b>
            </Typography>
            <Typography variant='body1'>
              <ol type="a">
                <li style={{ marginBottom: '10px' }}>
                  This Public License applies for the term of the Copyright and Similar Rights licensed here. However, if You fail to comply with this Public License,
                  then Your rights under this Public License terminate automatically.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Where Your right to use the Licensed Material has terminated under Section 6(a), it reinstates:
                  <ol type="1">
                    <li style={{ marginBottom: '10px' }}>
                      automatically as of the date the violation is cured, provided it is cured within 30 days of Your discovery of the violation; or
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      upon express reinstatement by the Licensor.
                    </li>
                  </ol>
                  For the avoidance of doubt, this Section 6(b) does not affect any right the
                  Licensor may have to seek remedies for Your violations of this Public License.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  For the avoidance of doubt, the Licensor may also offer the Licensed Material under separate terms or conditions or
                  stop distributing the Licensed Material at any time; however, doing so will not terminate this Public License.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Sections 1, 5, 6, 7, and 8 survive termination of this Public License.
                </li>
              </ol>
            </Typography>
            {/*'Section 7'*/}
            <Typography variant='h6' align="left">
              <b>Section 7 – Other Terms and Conditions.</b>
            </Typography>
            <Typography variant='body1'>
              <ol type="a">
                <li style={{ marginBottom: '10px' }}>
                  The Licensor shall not be bound by any additional or different terms or conditions communicated by You unless expressly agreed.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are
                  separate from and independent of the terms and conditions of this Public License.
                </li>
              </ol>
            </Typography>
            {/*'Section 8'*/}
            <Typography variant='h6' align="left">
              <b>Section 8 – Interpretation.</b>
            </Typography>
            <Typography variant='body1'>
              <ol type="a">
                <li style={{ marginBottom: '10px' }}>
                  For the avoidance of doubt, this Public License does not, and shall not be interpreted to, reduce, limit, restrict,
                  or impose conditions on any use of the Licensed Material that could lawfully be made without permission under this Public License.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  To the extent possible, if any provision of this Public License is deemed unenforceable, it shall be automatically reformed to the minimum
                  extent necessary to make it enforceable. If the provision cannot be reformed, it shall be severed from this Public License without affecting
                  the enforceability of the remaining terms and conditions.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  No term or condition of this Public License will be waived and no failure to comply consented to unless expressly agreed to by the Licensor.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Nothing in this Public License constitutes or may be interpreted as a limitation upon, or waiver of, any privileges and immunities
                  that apply to the Licensor or You, including from the legal processes of any jurisdiction or authority.
                </li>


              </ol>

            </Typography>




          </DemoGrid>
        </Grid>
      </CardContent>
    </Card >
  )
}

export default LinceseText
