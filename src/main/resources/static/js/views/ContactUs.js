export default function ContactUs() {
    //language=html
    return `
        <div class="bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="content-height w-full flex flex-col items-center justify-center">

                <div class="bg-slate-200 opacity-95 border-slate-300 border-2 shadow-xl rounded-md w-3/4 h-full flex flex-col items-center justify-center p-3 my-3">
                    <div class="text-3xl font-medium text-center p-3 lg:text-4xl text-primary mb-4 mt-2">
                        Contact Us
                    </div>

                    <div id="contact-body flex flex-col w-full h-full">

                        <div id="collin" class="flex flex-col justify-start m-3">
                            <div class="text-xl font-medium text-left lg:text-4xl text-primary mb-4 mt-2">
                                Collin Jones
                            </div>
                            <div class="description float-right">
                                <p>
                                    Collin is a versatile Web Developer provides interpersonal communication and
                                    understanding of web development considerations. He has a genuine interest in tech
                                    has fueled the desire to pursue a career that will consistently offer new challenges
                                    and provide family-sustaining growth opportunities. He is looking forward to a
                                    career that embraces challenging projects and utilizes cultivated approach based on
                                    latest technology standards.
                                </p>
                            </div>
                            <div class="flex justify-start items-center m-2">
                                <img src="../../img/github.png" class="mr-2" alt="Git Hub Logo"><a onclick=\"window.location.href='https://github.com/Collin-Jones'\" class="mx-3">GitHub</a>
                                <img src="../../img/linkedin.png" class="mr-2" alt="Linkedin Logo"><a onclick=\"window.location.href='https://www.linkedin.com/in/collin-g-jones/'\" class="mx-3">Linkedin</a>
                            </div>
                        </div>

                        <div id="trevor" class="flex flex-col justify-start m-3">
                            <div class="text-xl font-medium text-left lg:text-4xl text-primary mb-4 mt-2">
                                Trevor Esparza
                            </div>
                            <div class="description float-right">
                                <p>
                                    Trevor is a full-stack developer with a proven ability to perform in time-sensitive
                                    environments with hard deadlines while maintaining high-quality results. He is able
                                    to self-start with the necessary skills to work alone while still possessing the
                                    ability to collaborate and add value to larger projects. He is looking for an
                                    opportunity to develop applications that are artistically appealing, easily
                                    navigated, and dynamic resulting in increased traffic, page views, and user
                                    experiences.
                                </p>
                            </div>
                            <div class="flex justify-start items-center m-2">
                                <img src="../../img/github.png" class="mr-2" alt="Git Hub Logo"><a onclick=\"window.location.href='https://github.com/esptrev'\" class="mx-3">GitHub</a>
                                <img src="../../img/linkedin.png" class="mr-2" alt="Linkedin Logo"><a onclick=\"window.location.href='https://www.linkedin.com/in/trevoresparza30/'\" class="mx-3">Linkedin</a>
                            </div>
                        </div>

                        <div id="raymond" class="flex flex-col justify-start m-3">
                            <div class="text-xl font-medium text-left lg:text-4xl text-primary mb-4 mt-2">
                                Raymond Dugan
                            </div>
                            <div class="description float-right">
                                <p>
                                    Raymond is an Army veteran and passionate Software Developer with previous
                                    experience in project management and customer service in the InformationTechnology
                                    industry. Skills obtained in the IT industry of problem-solving, communication, and
                                    teamwork will be instrumental in building user-friendly, scalable applications that
                                    will benefit both the user and the company.
                                </p>
                            </div>
                            <div class="flex justify-start items-center m-2">
                                <img src="../../img/github.png" class="mr-2" alt="Git Hub Logo"><a onclick=\"window.location.href='https://github.com/raymondjdugan'\" class="mx-3">GitHub</a>
                                <img src="../../img/linkedin.png" class="mr-2" alt="Linkedin Logo"><a onclick=\"window.location.href='https://www.linkedin.com/in/raymond-dugan/'\" class="mx-3">Linkedin</a>
                            </div>
                        </div>

                        <div id="scott" class="flex flex-col justify-start m-3">
                            <div class="text-xl font-medium text-left lg:text-4xl text-primary mb-4 mt-2">
                                Scott Carpenter
                            </div>
                            <div class="description float-right">
                                <p>
                                    Scott is a service-minded Software Developer and Army veteran with a B.S. in
                                    Biomedical Science and experience as a hospitality leader. His military and
                                    professional background have developed him into someone who asks questions,
                                    marvels
                                    at challenges, serves others, and enjoys finding creative solutions. He aspires
                                    to
                                    immerse himself in STEM industries such as healthcare technology to develop more
                                    user-friendly patient-provider interactions, or participate in business
                                    technology
                                    applications to serve customer needs.
                                </p>
                            </div>
                            <div class="flex justify-start items-center m-2">
                                <img src="../../img/github.png" class="mr-2" alt="Git Hub Logo"><a onclick=\"window.location.href='https://github.com/scottCarpenter89'\" class="mx-3">GitHub</a>
                                <img src="../../img/linkedin.png" class="mr-2" alt="Linkedin Logo"><a onclick=\"window.location.href='https://www.linkedin.com/in/scottCarpenter89/'\" class="mx-3">Linkedin</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}