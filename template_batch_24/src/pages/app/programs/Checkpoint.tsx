import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Checkpoint(props: any) {
  const { progress } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    let progressLen = progress.length;
    setActiveStep(progressLen);
  }, [progress.length]);

  const handleDate = (date: string) => {
    return date?.split("T")[0];
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            <Typography>Apply Bootcamp</Typography>
          </StepLabel>
          <StepContent TransitionProps={{ in: true }}>
            <Typography sx={{ fontSize: 13 }}>
              {/* <p className="text-xs"> */}
              {"Applied on " +
                (handleDate(progress[0]?.parogActionDate)
                  ? handleDate(progress[0]?.parogActionDate)
                  : "N/A")}
              {/* </p> */}
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography>Filtering Test</Typography>
          </StepLabel>
          <StepContent TransitionProps={{ in: true }}>
            <Typography sx={{ fontSize: 13 }}>
              {/* <p className="text-xs"> */}
              {"Result passed on " +
                (handleDate(progress[1]?.parogActionDate)
                  ? handleDate(progress[1]?.parogActionDate)
                  : "N/A")}
              {/* </p> */}
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography>Contract</Typography>
          </StepLabel>
          <StepContent TransitionProps={{ in: true }}>
            <Typography sx={{ fontSize: 13 }}>
              {/* <p className="text-xs"> */}
              {"Done on " +
                (handleDate(progress[2]?.parogActionDate)
                  ? handleDate(progress[2]?.parogActionDate)
                  : "N/A")}
              {/* </p> */}
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography>Briefing Bootcamp</Typography>
          </StepLabel>
          <StepContent TransitionProps={{ in: true }}>
            <Typography sx={{ fontSize: 13 }}>
              {/* <p className="text-xs"> */}
              {"Already join on " +
                (handleDate(progress[3]?.parogActionDate)
                  ? handleDate(progress[3]?.parogActionDate)
                  : "N/A")}
              {/* </p> */}
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography>Join Bootcamp</Typography>
          </StepLabel>
          <StepContent TransitionProps={{ in: true }}>
            <Typography sx={{ fontSize: 13 }}>
              {/* <p className="text-xs"> */}
              {"Applied on " +
                (handleDate(progress[4]?.parogActionDate)
                  ? handleDate(progress[4]?.parogActionDate)
                  : "N/A")}
              {/* </p> */}
            </Typography>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
