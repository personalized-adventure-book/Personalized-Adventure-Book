import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
import {
  BookOpen,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Truck,
  Download,
  Plus,
  Archive,
} from "lucide-react";

interface OrderDraft {
  id: string;
  title: string;
  formData: any;
  currentStep: number;
  savedAt: string;
  status: "draft";
}

interface CompletedOrder {
  orderNumber: string;
  bookData: any;
  orderType: "digital" | "printed";
  total: number;
  orderDate: string;
  status: "confirmed" | "processing" | "shipped" | "delivered";
}

const Orders = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [drafts, setDrafts] = useState<OrderDraft[]>([]);
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([]);

  useEffect(() => {
    // Load drafts
    const savedDrafts = JSON.parse(localStorage.getItem("orderDrafts") || "[]");
    setDrafts(savedDrafts);

    // Load completed orders
    const savedOrders = JSON.parse(
      localStorage.getItem("completedOrders") || "[]",
    );
    setCompletedOrders(savedOrders);
  }, []);

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem("orderDrafts", JSON.stringify(updatedDrafts));
  };

  const continueDraft = (draft: OrderDraft) => {
    localStorage.setItem("bookBuilderDraft", JSON.stringify(draft));
    localStorage.setItem("skipDraftDetection", "true");
    navigate("/create");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "confirmed":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return Clock;
      case "confirmed":
        return CheckCircle;
      case "processing":
        return Clock;
      case "shipped":
        return Truck;
      case "delivered":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold adventure-text-gradient">
              My Orders
            </h1>
            <p className="text-foreground/70 mt-2">
              Manage your drafts and track your book orders
            </p>
          </div>
          <Button asChild className="flex items-center space-x-2">
            <Link to="/create">
              <Plus className="w-4 h-4" />
              <span>Create New Book</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Drafts Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Edit className="w-5 h-5 text-adventure-blue" />
              <h2 className="text-2xl font-bold">Drafts</h2>
              <Badge variant="secondary">{drafts.length}</Badge>
            </div>

            {drafts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Archive className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No drafts yet</h3>
                  <p className="text-foreground/60 mb-4">
                    Start creating a book and your progress will be saved here
                  </p>
                  <Button asChild>
                    <Link to="/create">Start Creating</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {drafts.map((draft) => (
                  <Card
                    key={draft.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {draft.title}
                          </CardTitle>
                          <p className="text-sm text-foreground/60">
                            Saved {formatDate(draft.savedAt)}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor("draft")} text-white`}
                        >
                          Draft
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground/70">
                          Step {draft.currentStep} of 5 completed
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => continueDraft(draft)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteDraft(draft.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-adventure-blue h-2 rounded-full transition-all"
                            style={{
                              width: `${(draft.currentStep / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Completed Orders Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-adventure-green" />
              <h2 className="text-2xl font-bold">Orders</h2>
              <Badge variant="secondary">{completedOrders.length}</Badge>
            </div>

            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-foreground/60 mb-4">
                    Complete your first book order to see it here
                  </p>
                  <Button asChild>
                    <Link to="/create">Create Your First Book</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <Card
                      key={order.orderNumber}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {order.bookData.childName}'s Adventure
                            </CardTitle>
                            <p className="text-sm text-foreground/60">
                              Order #{order.orderNumber} •{" "}
                              {formatDate(order.orderDate)}
                            </p>
                          </div>
                          <Badge
                            className={`${getStatusColor(order.status)} text-white flex items-center space-x-1`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{order.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground/70">Type:</span>
                            <div className="flex items-center space-x-1">
                              {order.orderType === "digital" ? (
                                <Download className="w-4 h-4" />
                              ) : (
                                <BookOpen className="w-4 h-4" />
                              )}
                              <span className="capitalize">
                                {order.orderType}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground/70">Total:</span>
                            <span className="font-medium">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>

                          {/* Status-specific actions */}
                          {order.status === "delivered" &&
                            order.orderType === "digital" && (
                              <Button size="sm" className="w-full mt-3">
                                <Download className="w-4 h-4 mr-2" />
                                Download Book
                              </Button>
                            )}

                          {order.status === "confirmed" && (
                            <div className="bg-blue-50 p-3 rounded-lg mt-3">
                              <p className="text-sm text-blue-700">
                                {order.orderType === "digital"
                                  ? "Your book is being prepared and will be sent via email when ready."
                                  : "Your book is being printed and will be shipped soon."}
                              </p>
                            </div>
                          )}

                          {order.status === "shipped" && (
                            <div className="bg-orange-50 p-3 rounded-lg mt-3">
                              <p className="text-sm text-orange-700">
                                Your book has been shipped and is on its way!
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="inline-block">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button asChild variant="outline">
                  <Link to="/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Book
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Examples
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;
