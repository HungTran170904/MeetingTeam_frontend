import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MessageType from '../Message/MessageType.js';

describe('Hello Component', () => {
          const chatMessage={
                    senderId: "abc",
                    recipientId: "123",
                    content: "Hello, World!",
                    messageType: "TEXT",
                    createdAt: new Date(),
          }
          it("renders the correct message", () => {
            render(<MessageType message={chatMessage} />);
            const content = screen.getByText("Hello, World!");
            expect(content).toBeInTheDocument();
          });
});