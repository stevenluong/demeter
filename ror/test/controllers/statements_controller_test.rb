require 'test_helper'

class StatementsControllerTest < ActionController::TestCase
  setup do
    @statement = statements(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:statements)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create statement" do
    assert_difference('Statement.count') do
      post :create, statement: { bank: @statement.bank, date: @statement.date, pdf: @statement.pdf }
    end

    assert_redirected_to statement_path(assigns(:statement))
  end

  test "should show statement" do
    get :show, id: @statement
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @statement
    assert_response :success
  end

  test "should update statement" do
    patch :update, id: @statement, statement: { bank: @statement.bank, date: @statement.date, pdf: @statement.pdf }
    assert_redirected_to statement_path(assigns(:statement))
  end

  test "should destroy statement" do
    assert_difference('Statement.count', -1) do
      delete :destroy, id: @statement
    end

    assert_redirected_to statements_path
  end
end
