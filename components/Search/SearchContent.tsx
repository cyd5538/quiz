import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { Quiz } from "@/types";
import { db } from "@/lib/firebase";
import { QuizLists } from "@/components/Home/QuizList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loading } from "../ui/Loading";


function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState<string>(searchQuery);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, "quizzes"),
          where("title", ">=", searchQuery),
          where("title", "<=", searchQuery + "\uf8ff"),
          orderBy("title"),
          orderBy("viewCount", "desc"), 
          limit(40)
        );

        const querySnapshot = await getDocs(q);
        const fetchedQuizzes: Quiz[] = [];
        querySnapshot.forEach((doc) => {
          fetchedQuizzes.push({ id: doc.id, ...doc.data() } as Quiz);
        });

        setQuizzes(fetchedQuizzes);
      } catch (err) {
        setError("An error occurred errors. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100">
        <Loading className="bg-white text-black">
          Loading...
        </Loading>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`?q=${search}`);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto 2xl:w-[1440px] w-full mt-20 px-1">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: {searchQuery}
      </h1>
      <form onSubmit={handleSubmit} className="relative mb-12 max-w-[300px] flex gap-2">
        <Input
          className="border border-black font-semibold w-full pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute top-[12px] left-2" size={18} />
        <Button type="submit">Search</Button>
      </form>
      {quizzes.length === 0 ? (
        <div className="h-[70vh] text-xl font-semibold w-full flex justify-center items-center">The data does not exist.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 place-items-center">
          {quizzes.map((quiz) => (
            <QuizLists key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchContent