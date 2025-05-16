import{ render, screen, cleanup } from "@testing-library/react";
import Header from "../Header/Header";

describe("testing Header content", ()=>
    {
        afterEach(()=>
        {
            cleanup();
        });

        test(" Should render the header with a children and logo", ()=>
        {
            render(
                <Header>
                    <h1>KeepNote</h1>
                </Header>
            );

            const header = screen.getByRole("banner");
            const logo = screen.getAllByText(/KeepNote/i);
            expect(header).toBeInTheDocument();
            expect(logo[0]).toBeInTheDocument();
            expect(screen.getByText(/KeepNote/i)).toBeInTheDocument();

        })
    });