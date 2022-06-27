import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import Story from "./Story";

export default function Stories() {
  const [storyUsers, setSoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState)
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setSoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {currentUser && (
        <Story img={currentUser?.userImg} username={currentUser?.username} isUser="true"/>
      )}
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}
