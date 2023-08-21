import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicAccordion(props: any) {
  console.log("ini props accordion ", props);
  const { data } = props;
  return (
    <div>
      {data &&
        data.map((item: any) => {
          return (
            <Accordion key={item.sectId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.sectId}a-content`}
                id={`panel${item.sectId}a-header`}
              >
                <Typography>{item.sectTitle}</Typography>
              </AccordionSummary>
              <ul>
                {item.sectionDetails.map((title: any) => {
                  return (
                    <li key={title.secdId}>
                      <AccordionDetails
                      // sx={{
                      //   bgcolor: "#bdc2c9",
                      //   color: "#dbdbdb",
                      // }}
                      >
                        <Typography className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>

                          {title.secdTitle}
                        </Typography>
                      </AccordionDetails>
                    </li>
                  );
                })}
              </ul>
            </Accordion>
          );
        })}
    </div>
  );
}
