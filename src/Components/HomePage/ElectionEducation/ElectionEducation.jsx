import React, { useState } from "react";
import "./ElectionEducation.css";
import EducationModal from "./EducationModal";

const ElectionEducation = () => {
  const [showModal, setShowModal] = useState(false);
  const [infoItemIndex, setInfoItemIndex] = useState(0);
  const [blurbIndex, setBlurbIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalAnimation, setModalAnimation] = useState("slide-up");

  const infoItems = [
    {
      title: "Elections: Primary vs General",
      images: [
        "assets/elections2.webp",
        "assets/elections3.jpg",
        "assets/elections.png",
        "assets/elections.jpg",
      ],
      blurbs: [
        "Let's take a general look at the difference between Primary and General Elections",
        "A primary election is held by political parties to choose their candidates for various offices. There are different types of primaries, such as open primaries, where any registerd voter can participate, and closed primaries, where only registered party members can vote.",
        "The general election is the 'big' election you hear about in the news. The is where everyone votes among the candiates nominated by each party.",
        "Primary and General elections are held for all offices, including presidents. The general election chooses between the winners of each primary election, and typically takes place on the Tuesday after the first Monday in November",
      ],
    },
    {
      title: "The Electoral College",
      images: [
        "assets/college1.jpeg",
        "assets/votes-college.webp",
        "assets/cali-votes.png",
        "assets/college2.webp",
        "assets/popular-vote.webp",
      ],
      blurbs: [
        "Let's go over how the United States uses the Electoral College to elect its president",
        "Every U.S. state has a certain amount of votes: number of Senators + number of Representatives.\n\n Every state has 2 senators, but the number of representatives a state has depends on the state's population according to the most recent U.S. Census. Let's use California as an example, which, in 2016, had 53 representatives and 2 senators.\n\n Thus, California has 55 electoral votes. ",
        "If a candidate wins the majority vote in a state, the candidate takes all of that state's Electoral Votes. In California, the majority voted for Hillary Clinton (61.7%). Because of this, Clinton took all 55 of California's electoral votes.",
        "To win the Presidential Election, a candidate must receive the most electoral votes, which currently totals to 270 out of 538.",
        "Just because a candidate wins the popular vote, does not mean they will win the electoral vote. In 2016, more people in the U.S. voted for Clinton than Trump. However, Trump had more Electoral Votes, giving him the Presidency.",
      ],
    },
    {
      title: "Political Parties",
      images: ["assets/parties.png"],
      blurbs: ["blurb 1", "blurb 2", "blurb 3"],
    },
    {
      title: "Congress & Terms",
      images: ["assets/congress.png"],
      blurbs: ["blurb 1", "blurb 2", "blurb 3"],
    },
  ];

  const handleItemClick = (index) => {
    setInfoItemIndex(index);
    setBlurbIndex(0);
    setImageIndex(0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setModalAnimation("slide-down");
    setTimeout(() => {
      // Sets it for the next time so it slides up when called
      setModalAnimation("slide-up");
    }, 600);
  };

  const handleNextImage = () => {
    setImageIndex((prevImageIndex) => {
      const nextImageIndex = prevImageIndex + 1;
      return nextImageIndex < infoItems[infoItemIndex].images.length
        ? nextImageIndex
        : 0;
    });
  };

  const handleNextBlurb = () => {
    setBlurbIndex((prevBlurbIndex) => {
      const nextBlurbIndex = prevBlurbIndex + 1;
      return nextBlurbIndex < infoItems[infoItemIndex].blurbs.length
        ? nextBlurbIndex
        : 0;
    });
  };

  return (
    <div className="info-section">
      <div className="info-title">
        <h2>Learn about elections in the United States</h2>
        <p>Click on a card to read more</p>
      </div>
      <div id="education-section">
        {infoItems.map((item, index) => (
          <div
            className="info-item"
            key={index}
            onClick={() => handleItemClick(index)}
          >
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
      <EducationModal
        show={showModal}
        onClose={handleCloseModal}
        content={infoItems[infoItemIndex]}
        currentImageIndex={imageIndex}
        nextImage={handleNextImage}
        currentBlurbIndex={blurbIndex}
        nextBlurb={handleNextBlurb}
        modalAnimation={modalAnimation}
      />
    </div>
  );
};

export default ElectionEducation;
