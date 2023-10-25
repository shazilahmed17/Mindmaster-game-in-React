import "./App.css";
import { useEffect, useState } from "react";

// header

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="letters-container">
          <div
            style={{
              backgroundColor: "orange",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            M
          </div>
          <div
            style={{
              backgroundColor: "pink",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            A
          </div>
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            S
          </div>
          <div
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            T
          </div>
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            E
          </div>
          <div
            style={{
              backgroundColor: "purple",
              color: "white",
              fontSize: "3.5em",
            }}
            className="individual-letter"
          >
            R
          </div>
          <div
            style={{
              backgroundColor: "rgb(226, 218, 218)",
              color: "black",
              fontSize: "2.5em",
            }}
            className="individual-letter"
          >
            M
          </div>
          <div
            style={{
              backgroundColor: "rgb(226, 218, 218)",
              color: "black",
              fontSize: "2.5em",
            }}
            className="individual-letter"
          >
            I
          </div>
          <div
            style={{
              backgroundColor: "rgb(226, 218, 218)",
              color: "black",
              fontSize: "2.5em",
            }}
            className="individual-letter"
          >
            N
          </div>
          <div
            style={{
              backgroundColor: "rgb(226, 218, 218)",
              color: "black",
              fontSize: "2.5em",
            }}
            className="individual-letter"
          >
            D
          </div>
        </div>
      </div>
    </>
  );
};

const ShowRules = () => {
  const [showRules, setShowRules] = useState(true);

  const changeState = () => {
    setShowRules((showRules) =>
      showRules === false ? (showRules = true) : (showRules = false)
    );
  };

  if (showRules) {
    return (
      <>
        <div className="show-rules">
          <button className="button-showRules" onClick={changeState}>
            Show Rules
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div className="show-rules">
        <button className="button-showRules" onClick={changeState}>
          Hide Rules
        </button>
        <p>
          Try to guess the pattern, in both order and color, within ten turns.
          After submitting a row, a small black peg is placed for each code peg
          from the guess which is correct in both color and position. A white
          peg indicates the existence of a correct color code peg placed in the
          wrong position.
        </p>
      </div>
    );
  }
};

// color choice side bar
const ColorChoice = (props) => {
  const colorChoiceSetter = (event, color) => {
    props.setColorChoice(color);
  };

  const colorPallet = ["orange", "pink", "green", "blue", "purple", "violet"];
  const btnStyle = (color) => ({
    backgroundColor: color,
    borderRadius: "50%",
    border: "none",
    width: "3em",
    height: "3em",
  });

  return (
    <>
      <div className="colorsChoiceContainer">
        {colorPallet.map((color) => (
          <div className="colorOption">
            <button
              onClick={(event) => colorChoiceSetter(event, color)}
              className="colorButton"
              style={btnStyle(color)}
            ></button>
          </div>
        ))}

        <p>{props.color}</p>
      </div>
    </>
  );
};

const GameRow = (props) => {
  const { color, index, guessColors, rowColors, setColor } = props;
  let [correctColors, setCorrectColors] = useState([]);
  const [renderCorrectColors, setRenderCorrectColors] = useState(false);

  const btnStyle = (color) => ({
    backgroundColor: color,
    // padding: "4px",
    margin: "0.2em",
    borderRadius: "50%",
    borderColor: "black",
    borderWidth: "1px",
    width: "3em",
    height: "3em",
  });

  const checkButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    marginLeft: "1em",
  };

  const renderCorrectColorsFunction = (state) => {
    setRenderCorrectColors(state);
  };

  const checkSequence = () => {
    let temp = [];

    guessColors.map((color, index) =>
      guessColors[index] === rowColors[index] ? temp.push("✓") : temp.push("x")
    );

    console.log(temp);

    temp = temp.sort(() => Math.random() - 0.5);

    console.log(temp);

    setCorrectColors([...temp]);

    console.log(correctColors);

    renderCorrectColorsFunction(true);

    // setCorrectColors([]);
  };

  return (
    <>
      <div className="gameRow">
        {rowColors.map((clr, idx) => (
          <button
            onClick={() => setColor(index, idx, color)}
            style={btnStyle(clr === "" ? "transparent" : clr)}
          />
        ))}
        {correctColors.length == 0 ? (
          <button
            id="checkbutton"
            style={checkButtonStyle}
            className="checkButton"
            onClick={() => checkSequence()}
          >
            ✓
          </button>
        ) : (
          <p></p>
        )}
        {renderCorrectColors === true ? (
          correctColors.map((sign) => <p>{sign}</p>)
        ) : (
          <p></p>
        )}
        {/* {correctColors.includes("x") === false && correctColors.length === 4 ? (
          <p>Won</p>
        ) : (
          <p></p>
        )} */}
      </div>
    </>
  );
};

const App = () => {
  const [colorChoice, setColorChoice] = useState("");
  const [guessColors, setGuessColors] = useState();
  const [colorGrid, setColorGrid] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  useEffect(() => {
    // logic to randomly set guess colors

    const temp = [];
    let rn = 0;

    const numberToColorMapping = {
      0: "orange",
      1: "blue",
      2: "purple",
      3: "green",
      4: "violet",
      5: "pink",
    };

    for (let i = 0; i < 4; i++) {
      rn = randomNumber(0, 5);
      if (temp.includes(numberToColorMapping[rn]) === false) {
        temp.push(numberToColorMapping[rn]);
      } else {
        i--;
      }
    }
    setGuessColors([...temp]);
    console.log(temp);
  }, []);

  const handleColor = (rowIdx, colorIdx, color) => {
    const temp = [...colorGrid[rowIdx]];
    temp[colorIdx] = color;
    colorGrid[rowIdx] = temp;
    setColorGrid([...colorGrid]);
  };

  const flexRow = {
    display: "flex",
    justifyContent: "center",
    margin: "2rem",
  };
  return (
    <>
      <Header />
      <ShowRules />
      <div style={flexRow}>
        <div>
          {colorGrid.map((row, index) => (
            <GameRow
              color={colorChoice}
              index={index}
              guessColors={guessColors}
              rowColors={row}
              setColor={handleColor}
            />
          ))}
        </div>
        <ColorChoice color={colorChoice} setColorChoice={setColorChoice} />
      </div>
    </>
  );
};

// helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App;
