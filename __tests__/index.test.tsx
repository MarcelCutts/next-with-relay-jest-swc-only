import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { getRequest, graphql } from "relay-runtime";
import fetch from "node-fetch";

const query = graphql`
  query IssuesQuery($owner: String!, $name: String!, $first: Int!) {
    repository(name: $name, owner: $owner) {
      issues(
        first: $first
        states: [OPEN]
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        edges {
          node {
            number
            title
            url
          }
        }
      }
    }
  }
`;

describe("Home", () => {
  beforeAll(async () => {
    const result = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer <GITHUB TOKEN>",
      },
      body: JSON.stringify({
        query:
          typeof query === "string" ? query : getRequest(query).params.text,
        variables: {
          owner: "vercel",
          name: "next.js",
          first: 4,
        },
      }),
    });

    console.log("🤸", await result.json());
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
