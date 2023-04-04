const Experiences = () => {
  return (
    <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <h2 className="text-3xl text-black font-bold leading-relaxed">Experiences</h2>
      {/* Experience 1 */}
      <div>
        <div className="mt-6 flex gap-6 items-center">
          <h3 className="text-xl text-green-500 font-semibold leading-relaxed">Freelance</h3>
          <p>Nov. 2017 - Today</p>
        </div>
        <ul className="list-disc mt-6 ml-6 text-black leading-relaxed">
          <li>
            Develop websites and dApps for many companies (Education, Health, Food, New
            Technologies...)
          </li>
          <li>
            Implement rich user experiences by creating new features utilizing HTML, CSS, JavaScript
            and TypeScript
          </li>
          <li>Integrate and test new features based on users feedback</li>
          <li>
            Development and maintenance of new products, technical documentation and workflows
          </li>
        </ul>
      </div>
      {/* Experience 2 */}
      <div>
        <div className="mt-6 flex gap-6 items-center">
          <h3 className="text-xl text-green-500 font-semibold leading-relaxed">DMD France</h3>
          <p>July. 2016 - Nov. 2021</p>
        </div>
        <ul className="list-disc mt-6 ml-6 text-black leading-relaxed">
          <li>Lead architecture, design and development of 15+ websites and applications</li>
          <li>Develop websites for 4 international business partners</li>
          <li>Integrate external APIs into web pages and applications</li>
          <li>Build automated data flows to replace repetitive tasks</li>
          <li>Integrate and test new features based on users feedback</li>
          <li>
            Development and maintenance of new products, technical documentation and workflows
          </li>
          <li>Followed industry best practices and learned 3 new technologies</li>
        </ul>
      </div>
    </section>
  );
};

export default Experiences;
