"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { Project } from "@/types/project";

export default function PageClient({ projectData }: { projectData: Project | null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [reviewer, setReviewer] = useState("");

  if (!projectData) {
    return <div>Project not found</div>;
  }

  const assessmentContent = {
    main: `The Additionality assessment for this Carbon Reduction project focuses on a critical aspect of carbon credit initiatives: ensuring that the greenhouse gas (GHG) emission reductions or removals would not have occurred without the financial incentive provided by carbon credit revenues. This evaluation is essential for maintaining the integrity and effectiveness of carbon offset programs, as it verifies that credits sold represent real, additional reductions that would have happened anyway.`,
    points: [
      {
        number: "1.",
        text: "The provided document sources do not contain sufficient information to directly answer the keyword. How is the project demonstrating that its GHG emission reductions or removals are truly additional, ensuring that they would not have occurred without the financial incentive provided by carbon credit revenues. The available sources mainly discuss:",
        subPoints: [
          "Local farmers' beliefs about the project's benefits [1]",
          "Calculation of emission reductions [2]",
          "Potential job creation and environmental benefits [3]"
        ]
      },
      {
        number: "2.",
        text: "These sources do not address the concept of additionality or how the project demonstrates that its reductions wouldn't have occurred without carbon credit revenues. To properly answer this question, more specific information about the project's additionality assessment would be needed.",
        subPoints: []
      },
      {
        number: "3.",
        text: "The provided document sources do not contain sufficient information to directly answer the keyword regarding Investment Analysis and how the project ensures it meets the carbon-crediting program's additionality requirements. The sources lack specific details about:",
        subPoints: [
          "The use of financial indicators like NPV or IRR",
          "Transparent documentation of assumptions and data",
          "Consistency with company decision-making processes",
          "Validation by a VVB or the carbon-crediting program..."
        ]
      }
    ]
  };

  const questions = [
    {
      title: "Legal Requirements",
      question: "How does this project ensure that its emission reductions or removals go beyond the requirements of enforced legal regulations, demonstrating that the generated carbon credits provide additional and measurable climate benefits"
    },
    {
      title: "Additionality Evaluation",
      question: "How does this project ensure that the evaluation of its additionality is conducted prior to registration and at appropriate intervals thereafter, with validation by a VVB and/or the carbon-crediting program, to maintain compliance with crediting requirements"
    },
    {
      title: "Carbon Credit Compliance",
      question: "How does this project ensure compliance with the carbon-crediting program's requirements by providing publicly available documented evidence of carbon credit consideration before the start date, securing validation from a VVB or the program, and submitting the necessary documentation within the required timeframe"
    },
    {
      title: "Investment Analysis",
      question: "How does this project..."
    }
  ];

  const visibleQuestions = showAllQuestions ? questions : questions.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Carbon Accounting</h1>

      {/* Top Section with Generate Assessment Button and Headers */}
      <div className="grid grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
            Generate Assessment
          </Button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Reviewer</label>
          <Input 
            placeholder="Enter reviewer name"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-center">Qatalyst Responses</div>
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              Satisfactory
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-center">User Rating</div>
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              Satisfactory
            </Badge>
          </div>
        </div>
      </div>

      {/* Assessment and List of Questions Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">{assessmentContent.main}</p>
              
              {assessmentContent.points.map((point, index) => (
                <div key={index} className={!isExpanded && index >= 1 ? "hidden" : ""}>
                  <p className="text-sm mb-2">
                    <span className="font-medium">{point.number}</span> {point.text}
                  </p>
                  {point.subPoints.length > 0 && (
                    <ul className="ml-6 space-y-1">
                      {point.subPoints.map((subPoint, subIndex) => (
                        <li key={subIndex} className="text-sm text-muted-foreground">
                          • {subPoint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <Button
                variant="link"
                className="text-blue-600 p-0 h-auto"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    See less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    See all <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Ask Qatalyst section */}
            <div className="mt-6 space-y-2">
              <Textarea
                placeholder="Ask Qatalyst something..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* List of Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">List of questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visibleQuestions.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-sm">• {item.title}</h4>
                  <p className="text-sm text-muted-foreground ml-4">
                    {item.question}
                  </p>
                </div>
              ))}

              {questions.length > 3 && (
                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto"
                  onClick={() => setShowAllQuestions(!showAllQuestions)}
                >
                  {showAllQuestions ? (
                    <>
                      See less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      See all <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}